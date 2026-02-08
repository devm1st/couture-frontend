import { toast } from "react-toastify";

const base = {
  position: "top-center",
  autoClose: 3000,
  theme: "dark",
};

export const toastSuccess = (msg, opts = {}) =>
  toast.success(msg, { ...base, ...opts });

export const toastError = (msg, opts = {}) =>
  toast.error(msg, { ...base, ...opts });

export const toastInfo = (msg, opts = {}) =>
  toast.info(msg, { ...base, ...opts });

export const toastWarn = (msg, opts = {}) =>
  toast.warn(msg, { ...base, ...opts });
