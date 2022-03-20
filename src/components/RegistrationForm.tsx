import { useState, ChangeEventHandler, ChangeEvent } from "react";
import { db as firebaseDB } from "../services/firebase-client";
import { sha256 } from "js-sha256";

export const RegistrationForm = ({ onRegistrationDone = (() => {}) }) => {
  
  const [username, setUsername] = useState("");
  const [redemptionType, setRedemptionType] = useState("");

  const InputChangeHandlers: { [key: string]: ChangeEventHandler<HTMLInputElement> } = {
    username: (e: ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    },
    redemptionType: (e: ChangeEvent<HTMLInputElement>) => {
      setRedemptionType(e.target.value);
    },
  };
  const createInputChangeHandler = ( name: string ): ChangeEventHandler<HTMLInputElement> => {
    const handleInputChange = InputChangeHandlers[name] || ((event: ChangeEvent<HTMLInputElement>) => {});

    return handleInputChange;
  };
  const createUser = async () => {
    const createDate = new Date();
    const redemptionString = `${username}_${redemptionType}-${createDate}`;
    const redemptionCode = sha256(redemptionString)

    try {
      await firebaseDB.append("users", {
        username,
        redemptionType,
        redemptionCode,
        createDate,
      });

      onRegistrationDone();
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <form>
      <h2>Registration Form</h2>
      <input
        type="text"
        name="username"
        value={username}
        onChange={createInputChangeHandler("username")}
      />
      <input
        type="text"
        name="redemptionType"
        value={redemptionType}
        onChange={createInputChangeHandler("redemptionType")}
      />
      <button onClick={createUser}>Create</button>
    </form>
  );
};
