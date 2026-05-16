import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { RiGoogleFill, RiEyeLine, RiEyeOffLine, RiShieldCheckLine } from "react-icons/ri";
import { auth } from "../Firebase/Firebase.init";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Register = () => {
  const { registerUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const inputClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl bg-base-200/60 border ${hasError ? "border-error" : "border-base-300"} text-primary placeholder:text-secondary outline-none focus:ring-2 focus:ring-accent transition backdrop-blur`;

  const onSubmit = async ({ name, email, password, photo }) => {
    setAuthError("");

    try {
      await registerUser(email, password);

      let photoURL = "";

      // Upload image to imgbb
      if (photo && photo[0]) {
        const formData = new FormData();
        formData.append("image", photo[0]);

        const imgbbURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY
          }`;

        const res = await axios.post(imgbbURL, formData);

        photoURL = res.data.data.url;
      }

      // Update Firebase profile
      await updateUserProfile({
        displayName: name,
        photoURL,
      });

      // Save user to DB
      await axios.post(`${API}/users`, {
        uid: auth.currentUser.uid,
        name,
        email,
        photoURL,
      });

      await auth.signOut();
      navigate("/login", { state: { registered: true } });

      // await auth.signOut();

      // navigate("/login", {
      //   state: { registered: true },
      // });

    } catch (err) {
      setAuthError(
        err.code === "auth/email-already-in-use"
          ? "An account with this email already exists."
          : "Something went wrong. Try again."
      );
    }
  };

  const handleGoogle = async () => {
    setAuthError("");
    try {
      const result = await signInWithGoogle();
      const { uid, displayName, email, photoURL } = result.user;

      // Save to DB (upsert — safe to call every login)
      await axios.post(`${API}/users`, {
        uid,
        name: displayName,
        email,
        photoURL,
      });

      navigate("/dashboard/overview");
    } catch {
      setAuthError("Google sign-in failed. Try again.");
    }
  };

  return (
    <div className="sectionPadding min-h-screen flex items-center justify-center bg-base-100 relative overflow-hidden px-4">
      <div className="absolute size-70 bg-accent/20 blur-[120px] rounded-full top-0 left-0 xl:size-96 xl:top-10 xl:left-10" />
      <div className="absolute size-70 bg-primary/10 blur-[120px] rounded-full bottom-0 right-0 xl:size-96 xl:bottom-10 xl:right-10" />

      <div className="w-full max-w-md bg-base-200/40 backdrop-blur-2xl border border-base-300 rounded-3xl p-8 shadow-2xl">

        <div className="text-center mb-6">
          <RiShieldCheckLine className="text-accent mx-auto mb-2" size={28} />
          <h1 className="text-2xl font-bold text-primary">Create account</h1>
          <p className="text-secondary text-sm mt-1">Start your financial journey today</p>
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogle}
          className="btn btn-outline w-full rounded-xl border-base-300 text-primary hover:border-accent"
        >
          <RiGoogleFill className="text-accent text-lg" />
          Continue with Google
        </button>

        <div className="flex items-center gap-3 text-xs text-secondary my-5">
          <div className="flex-1 h-px bg-base-300" />
          or
          <div className="flex-1 h-px bg-base-300" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Photo */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary">
              Add profile image
            </label>

            <div className="relative">
              <input
                type="file"
                accept="image/*"
                className="w-full px-4 py-3 rounded-xl bg-base-200/60 border border-base-300 text-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-accent file:text-white hover:file:bg-accent/80 transition cursor-pointer"
                {...register("photo")}
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <input
              placeholder="Full name"
              className={inputClass(errors.name)}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              className={inputClass(errors.email)}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
              })}
            />
            {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (min. 8 characters)"
                className={`${inputClass(errors.password)} pr-10`}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "At least 8 characters required" },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[0-9])/,
                    message: "Must include one uppercase letter and one number",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
              >
                {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
            </div>
            {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
          </div>

          {authError && <p className="text-error text-sm">{authError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full rounded-xl"
          >
            {isSubmitting ? <span className="loading loading-spinner loading-sm" /> : "Create account"}
          </button>
        </form>

        <p className="text-center text-xs text-secondary mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-accent font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;