import { useAuthOverlay } from "../context/useAuthOverlay";
import Login from "../form/Login";
import Sign from "../form/Sign";
import ModalLayout from "../layouts/ModalLayout";

function Auth() {
  const { type } = useAuthOverlay();
  return (
    <ModalLayout type="center">
      {type == "login" ? <Login /> : <Sign />}
    </ModalLayout>
  );
}

export default Auth;
