import { useEffect } from "react";
import { useAppDispatch } from "store/hooks";
import { setIsLoadingSession, setUser } from "store/sessionSlice";
import { supabase } from "utils/supabaseClient";

export function useSession() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsLoadingSession(true));
    supabase.auth
      .getSession()
      .then((res) => {
        if (!res.data.session) return window.location.replace("/login");
        dispatch(setIsLoadingSession(false));
        dispatch(setUser(res.data.session.user));
      })
      .catch((err) => {
        console.log(`err: ${err}`);
        dispatch(setIsLoadingSession(false));
      });
  }, [dispatch]);
}
