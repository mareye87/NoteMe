import { Auth } from "@supabase/auth-ui-react";
import supabase from "../config/supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useAuth } from "../components/authProvider";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { user } = useAuth();
  console.log(user);

  if (user) {
    return <Navigate to="/dash" />;
  }

  return (
    <div className="flex justify-center items-center bg-slate-800 min-h-screen">
      <div className="items-center justify-center mx-6 p-8 rounded-md bg-purple-800 shadow-lg">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={[]}
        />
      </div>
    </div>
  );
};

export default Login;
