import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { RiEditLine, RiUserLine, RiMailLine, RiCloseLine } from "react-icons/ri";
import axios from "axios";

// const API = "http://localhost:3000";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const MyProfilePage = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: { name: user?.displayName || "" },
  });

  const inputClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl bg-base-200/60 border ${hasError ? "border-error" : "border-base-300"} text-primary placeholder:text-secondary outline-none focus:ring-2 focus:ring-accent transition backdrop-blur`;

  const openModal = () => {
    reset({ name: user?.displayName || "" });
    setError("");
    setModalOpen(true);
  };

  const onSubmit = async ({ name, photo }) => {
    setLoading(true);
    setError("");
    try {
      let photoURL = user?.photoURL || "";

      if (photo && photo[0]) {
        const formData = new FormData();
        formData.append("image", photo[0]);
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          formData
        );
        photoURL = res.data.data.url;
      }

      await updateUserProfile({ displayName: name, photoURL });
      await axios.patch(`${API}/users/${user.uid}`, { name, photoURL });

      setModalOpen(false);
    } catch {
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center relative overflow-hidden">

      {/* Background blobs — same style as login */}
      <div className="absolute size-70 bg-accent/20 blur-[120px] rounded-full top-0 left-0 xl:size-96" />
      <div className="absolute size-70 bg-primary/10 blur-[120px] rounded-full bottom-0 right-0 xl:size-96" />

      <div className="w-full max-w-md z-10">

        {/* Profile card */}
        <div className="bg-base-200/40 backdrop-blur-2xl border border-base-300 rounded-3xl p-8 shadow-2xl">

          {/* Avatar + name */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="avatar">
              <div className="w-24 rounded-full border-4 border-accent shadow-lg">
                <img
                  src={user?.photoURL || "https://img.icons8.com/ultraviolet/40/user-male-circle.png"}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-primary">{user?.displayName || "User"}</h2>
              <p className="text-secondary text-sm">{user?.email}</p>
            </div>
          </div>

          {/* Info rows */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-base-200/60 border border-base-300 backdrop-blur">
              <RiUserLine className="text-accent shrink-0" size={18} />
              <div>
                <p className="text-xs text-secondary uppercase tracking-wide">Full Name</p>
                <p className="text-primary font-medium text-sm">{user?.displayName || "—"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-base-200/60 border border-base-300 backdrop-blur">
              <RiMailLine className="text-accent shrink-0" size={18} />
              <div>
                <p className="text-xs text-secondary uppercase tracking-wide">Email</p>
                <p className="text-primary font-medium text-sm">{user?.email || "—"}</p>
              </div>
            </div>
          </div>

          {/* Update button */}
          <button
            onClick={openModal}
            className="btn btn-outline w-full rounded-xl border-base-300 text-primary hover:border-accent hover:text-accent"
          >
            <RiEditLine size={16} />
            Update Profile
          </button>
        </div>
      </div>

      {/* ── Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

          {/* Modal card — same glassmorphism style */}
          <div className="relative w-full max-w-md bg-base-200/40 backdrop-blur-2xl border border-base-300 rounded-3xl p-8 shadow-2xl overflow-hidden">

            {/* Modal background blobs */}
            <div className="absolute size-40 bg-accent/15 blur-[80px] rounded-full -top-10 -left-10 pointer-events-none" />
            <div className="absolute size-40 bg-primary/10 blur-[80px] rounded-full -bottom-10 -right-10 pointer-events-none" />

            {/* Modal header */}
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div>
                <h3 className="text-lg font-bold text-primary">Update Profile</h3>
                <p className="text-secondary text-xs mt-0.5">Edit your name or profile picture</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="btn btn-ghost btn-circle btn-sm text-secondary hover:text-primary"
              >
                <RiCloseLine size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">

              {/* Name */}
              <div>
                <label className="text-sm font-medium text-secondary block mb-1.5">Full Name</label>
                <input
                  placeholder="Your full name"
                  className={inputClass(errors.name)}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Photo */}
              <div>
                <label className="text-sm font-medium text-secondary block mb-1.5">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-3 rounded-xl bg-base-200/60 border border-base-300 text-primary file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-accent file:text-white hover:file:bg-accent/80 transition cursor-pointer backdrop-blur"
                  {...register("photo")}
                />
                <p className="text-xs text-secondary mt-1">Leave empty to keep current image</p>
              </div>

              {error && <p className="text-error text-sm">{error}</p>}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-ghost flex-1 rounded-xl border border-base-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary flex-1 rounded-xl"
                >
                  {loading
                    ? <span className="loading loading-spinner loading-sm" />
                    : "Save Changes"
                  }
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyProfilePage;