import { useOverlay } from "../context/useOverlay";
import ModalLayout from "../layouts/ModalLayout";

function CartUser() {
  const card = null;
  const { setOverlayVisible } = useOverlay();
  return (
    <ModalLayout type="right">
      <button
        className="overlay__close"
        onClick={() => setOverlayVisible(false)}
      >
        &times;
      </button>

      {!card ? (
        <h1
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Votre panier est vide
        </h1>
      ) : (
        <>
          <h2>Welcome Back</h2>
          <p>
            We'd love to have you join our network of creators & freelancers.
          </p>
          <button className="overlay__google-button">
            Sign Up with Google
          </button>
          <div className="overlay__divider">OR</div>
          <form>
            <label>Email*</label>
            <input type="email" placeholder="Enter Your Email" required />
            <label>Password*</label>
            <input type="password" placeholder="Enter a Password" required />
            <button type="submit" className="overlay__submit">
              Sign In
            </button>
          </form>
        </>
      )}
    </ModalLayout>
  );
}

export default CartUser;
