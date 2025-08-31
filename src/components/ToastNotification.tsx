interface ToastNotificationProps {
  toast: { message: string; visible: boolean; type: string };
}

export default function ToastNotification({ toast }: ToastNotificationProps) {
  if (!toast.visible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded-md text-white ${
        toast.type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {toast.message}
    </div>
  );
}
