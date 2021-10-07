import React from 'react';

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { onLogin, onLoginState } = props;

    function handleChangeEmail(e) {
        setEmail(e.target.value);
      }
      
      function handleChangePassword(e) {
        setPassword(e.target.value);
      }
    
      function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password){
          return;
        }
        onLogin({ email, password });
      }

      React.useEffect(() => {
        onLoginState(false);
      }, [onLoginState]);

    return (
        <section className="entrance">
            <div className="entrance__container">
                <h3 className="entrance__title">Вход</h3>
                <form className="entrance__form" onSubmit={handleSubmit}>
                    <input className="entrance__input"
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="Email"
                    type="e-mail"
                    name="loggin"
                    id="loggin-input"
                    minLength="2"
                    maxLength="40"
                    required
                    />
                    <input className="entrance__input"
                    value={password}
                    onChange={handleChangePassword}
                    placeholder="Пароль"
                    type="password"
                    name="password"
                    id="password-input"
                    minLength="2"
                    maxLength="10"
                    required
                    />
                    <button className="entrance__submit-btn">Войти</button>
                </form>
            </div>
        </section>
    )
}

export default Login;