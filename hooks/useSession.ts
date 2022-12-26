import { useEffect } from "react";
import { useAppDispatch } from "store/hooks";
import { setIsLoadingSession, setUser } from "store/userSlice";
import { supabase } from "utils/supabaseClient";

export function useSession() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsLoadingSession(true));
    supabase.auth
      .getSession()
      .then((res) => {
        if (res.data.session) {
          dispatch(setIsLoadingSession(false));
          dispatch(setUser(res.data.session.user));
          return;
        }
        window.location.replace("/login");
      })
      .catch((err) => {
        console.log(`err: ${err}`);
        dispatch(setIsLoadingSession(false));
      });
  }, [dispatch]);
}
