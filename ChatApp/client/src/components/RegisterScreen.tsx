import { useForm } from 'react-hook-form';
import { postRegisterUser } from "../api";
import { TOKEN, USER_INFO } from "../constants";
import { UserCredentialsParams, UserInfo } from "../types";
import { storage } from "../utils";
import jwt_decode from "jwt-decode";
import { useState } from "react";

export const RegisterScreen  = () => {
  const {
    handleSubmit
  } = useForm<UserCredentialsParams>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const changePage = () => {
    storage.set<boolean>('isLogin', true);
    location.reload();
  };

  const onSubmitRegister = async () => {
    
    const data: UserCredentialsParams = {
      username,
      password
    }
    const res = await postRegisterUser(data);

    if(res.status === 201) {
      const token = res.data.token;
      storage.set<string>(TOKEN, token);
      const user: UserInfo = jwt_decode(token);
      storage.set<UserInfo>(USER_INFO, { id: user.id, username: user.username });
      location.reload();
    }
    else {
      location.reload();
    }
  };

  return (
    <section>
      <h1 className="title">{'Регистрация'}</h1>
      <form onSubmit={handleSubmit(onSubmitRegister)} className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={changeUsername}
            required
            className="input"
            placeholder="Username"
          />

          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={changePassword}
            required
            className="input"
            placeholder="********"
          />
        </div>
        <button className="btn-success">Зарегистрироваться</button>
        <div className="flex flex-col gap-2">
          <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer" onClick={changePage}>{'Авторизация'}</a>
        </div>
      </form>
    </section>
  );
};