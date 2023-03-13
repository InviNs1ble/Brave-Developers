import { useForm } from 'react-hook-form';
import { postLoginUser } from "../api";
import { TOKEN, USER_INFO } from "../constants";
import { UserCredentialsParams, UserInfo } from "../types";
import { storage } from "../utils";
import jwt_decode from "jwt-decode";
import { useState } from "react";

export const LoginScreen = () => {
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
    storage.set<boolean>('isLogin', false);
    location.reload();
  };

  const onSubmitLogin = async () => {
    
    const data: UserCredentialsParams = {
      username,
      password
    }

    const res = await postLoginUser(data);

    if(res.status === 200) {
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
      <h1 className="title">{'Авторизация'}</h1>
      <form onSubmit={handleSubmit(onSubmitLogin)} className="flex flex-col items-center gap-4">
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
        <button className="btn-success">Войти</button>
        <div className="flex flex-col gap-2">
          <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer" onClick={changePage}>{'Регистрация'}</span>
        </div>
      </form>
    </section>
  );
};
