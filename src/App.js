import React from "react";
import "./App.css";

// firebase v9 modular imports
import { initializeApp } from "firebase/app";
import { Filter } from "bad-words";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnVecx_YgxsYi99N_ygJBe6Zsq8bxzk18",
  authDomain: "chat-app-ce41b.firebaseapp.com",
  projectId: "chat-app-ce41b",
  storageBucket: "chat-app-ce41b.firebasestorage.app",
  messagingSenderId: "503024507273",
  appId: "1:503024507273:web:5e44f9fc74a6947866a958",
  measurementId: "G-ENY2YDM8EY",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <h1>💬 Chat Now!</h1>
        {user && <SignOut />}
        {console.log("User:", user)}
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => signOut(auth)}>Sign Out</button>
  );
}

function ChatRoom() {
  const dummy = React.useRef();
  // reference a firestore collection
  const messagesRef = collection(firestore, "messages");

  // make a query for documents in a collection
  const q = query(messagesRef, orderBy("createdAt"), limit(100));

  // make query and listen to any updates to data with a hook
  const [messages] = useCollectionData(q, { idField: "id" });
  const [formValue, setFormValue] = React.useState("");

  // inside ChatRoom component:
  const sendMessage = async (e) => {
    e.preventDefault();

    const filter = new Filter();
    if (filter.isProfane(formValue)) {
      alert("🚫 Your message contains inappropriate language.");
      return;
    }

    const { uid, photoURL } = auth.currentUser;

    console.log("UID being sent:", uid);

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    console.log("UID being sent:", uid);

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {/* loop over each document: map over the array of messages, and for each message use a dedicated chat message component that has a key prop with the message id, and passes the document data as the msg prop */}
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        {/* scroll to the bottom of the chat window */}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something!"
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

// define chat message child component
function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  // distinguish between messages being sent and received
  // conditional css
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="pfp" />
      <p>{text}</p>
    </div>
  );
}

export default App;
