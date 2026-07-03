import { useNavigate } from "react-router-dom";

/**
 * Smart back navigation.
 * - If there is browser history to go back to, goes to the previous screen (navigate(-1)).
 * - Otherwise (direct load, refresh, or deep link with no history), goes to a sensible fallback.
 *
 * This gives users predictable, intuitive "back" behavior across the app.
 */
export function useBackNav(fallback = "/") {
  const navigate = useNavigate();
  return () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };
}