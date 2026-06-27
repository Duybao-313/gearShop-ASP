import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import cartService from "../services/cartService";

// ─── Cart Context ────────────────────────────────────────────────
const CartContext = createContext();

const CART_STORAGE_KEY = "duybao_cart";

// ─── Reducer ─────────────────────────────────────────────────────
const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload };

    case "ADD_ITEM": {
      // action.payload = { cartItemId (server), productId, name, price, imageUrl, brand, sku, quantity }
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (existingIndex >= 0) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity:
            updated[existingIndex].quantity + (action.payload.quantity || 1),
        };
        return { ...state, items: updated };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
            quantity: action.payload.quantity || 1,
          },
        ],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "UPDATE_QUANTITY": {
      const updated = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item,
      );
      return { ...state, items: updated };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
};

// ─── Helper: normalize API item → local cart item ─────────────────
const normalizeCartItem = (apiItem) => ({
  id: apiItem.productId, // id sản phẩm (dùng để render + key)
  cartItemId: apiItem.id, // id CartItem trên server (dùng để update/delete API)
  name: apiItem.product?.name || "",
  price: apiItem.product?.price || 0,
  imageUrl: apiItem.product?.imageUrl || "",
  brand: apiItem.product?.brand || "",
  sku: apiItem.product?.sku || "",
  quantity: apiItem.quantity,
});

// ─── Provider ─────────────────────────────────────────────────────
export const CartProvider = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();

  // Khôi phục giỏ hàng từ localStorage
  const getInitialState = () => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { items: parsed.items || [] };
      }
    } catch (e) {
      console.warn("Không thể khôi phục giỏ hàng:", e);
    }
    return { items: [] };
  };

  const [state, dispatch] = useReducer(cartReducer, null, getInitialState);

  // ─── Khi đã login → tải giỏ hàng từ server ─────────────────
  const [merged, setMerged] = React.useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (isAuthenticated && !merged) {
      // Merge localStorage cart vào server, rồi tải giỏ từ server
      const loadServerCart = async () => {
        try {
          const localItems = state.items;
          if (localItems.length > 0) {
            // Gộp giỏ localStorage lên server
            const mergePayload = localItems.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
            }));
            await cartService.mergeCart(mergePayload);
          }

          // Tải giỏ từ server
          const serverItems = await cartService.getCart();
          const normalized = (serverItems || []).map(normalizeCartItem);
          dispatch({ type: "SET_ITEMS", payload: normalized });
          setMerged(true);
        } catch (err) {
          console.warn("Không thể tải giỏ hàng từ server:", err.message);
          // Fallback: dùng localStorage
          setMerged(true);
        }
      };
      loadServerCart();
    }

    if (!isAuthenticated && !authLoading) {
      setMerged(false);
    }
  }, [isAuthenticated, authLoading]); // eslint-disable-line

  // Lưu vào localStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isAuthenticated]);

  // ─── Actions ──────────────────────────────────────────────────
  const addToCart = useCallback(
    async (product, quantity = 1) => {
      const payload = {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        brand: product.brand,
        sku: product.sku,
        quantity,
      };

      dispatch({ type: "ADD_ITEM", payload });

      // Nếu đã login → gọi API đồng bộ
      if (isAuthenticated) {
        try {
          await cartService.addToCart(product.id, quantity);
        } catch (err) {
          console.warn("Lỗi đồng bộ giỏ hàng lên server:", err.message);
        }
      }
    },
    [isAuthenticated],
  );

  const removeFromCart = useCallback(
    async (productId) => {
      // Tìm cartItemId trên server
      const item = state.items.find((i) => i.id === productId);
      dispatch({ type: "REMOVE_ITEM", payload: productId });

      if (isAuthenticated && item?.cartItemId) {
        try {
          await cartService.removeFromCart(item.cartItemId);
        } catch (err) {
          console.warn("Lỗi xóa giỏ hàng trên server:", err.message);
        }
      }
    },
    [isAuthenticated, state.items],
  );

  const updateQuantity = useCallback(
    async (productId, quantity) => {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: productId, quantity },
      });

      const item = state.items.find((i) => i.id === productId);
      if (isAuthenticated && item?.cartItemId) {
        try {
          await cartService.updateQuantity(item.cartItemId, quantity);
        } catch (err) {
          console.warn("Lỗi cập nhật số lượng trên server:", err.message);
        }
      }
    },
    [isAuthenticated, state.items],
  );

  const clearCart = useCallback(async () => {
    // Gọi API xóa giỏ hàng trên server TRƯỚC, rồi mới xóa state
    if (isAuthenticated) {
      try {
        await cartService.clearCart();
      } catch (err) {
        console.warn("Lỗi xóa giỏ hàng trên server:", err.message);
        // Nếu API thất bại, KHÔNG xóa state để tránh mất dữ liệu
        return;
      }
    }

    dispatch({ type: "CLEAR_CART" });
  }, [isAuthenticated]);

  // ─── Computed ─────────────────────────────────────────────────
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const value = {
    items: state.items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// ─── Hook ────────────────────────────────────────────────────────
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart phải được dùng trong <CartProvider>");
  }
  return context;
};

export default CartContext;
