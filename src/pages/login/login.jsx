import React, { useEffect, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { compHOC } from 'components/hoc'
import nameImg from 'common/images/login/name.png'
import pswImg from 'common/images/login/password.png'
import { initParticles } from './particles/app'
import { selectUser, authActions } from 'store/auth.slice'
import './particles/particles.min'
import './particles/style.less'

const initialState = {
  name: '',
  password: '',
  namePlaceholder: '请输入您的用户名 [admin]',
  passwordPlaceholder: '请输入您的密码 [admin]'
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'changeName':
      return { ...state, name: payload };
    case 'changePassword':
      return { ...state, password: payload };
    case 'changeNamePlaceholder':
      return { ...state, namePlaceholder: payload };
    case 'changePasswordPlaceholder':
      return { ...state, passwordPlaceholder: payload };
    default:
      throw new Error();
  }
}

const Login = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  const dispatchAction = useDispatch();
  const { $message } = props;
  useEffect(() => {
    initParticles();
  }, [])

  const handleLogin = () => {
    const { name, password } = state;
    // fake
    if (name === 'admin' && password === 'admin') {
      $message.loading('登录中...', { key: 'login' })
      setTimeout(() => {
        $message.success('登录成功!', { key: 'login' });
        dispatchAction(authActions.setUser({ name: 'admin', password: 'admin' }))
        navigate('/', { replace: true })
      }, 2000)
    } else {
      $message.error('用户名或密码错误')
    }
  }

  const handleKeyDown = (e) => (e.keyCode === 13) && handleLogin()

  const { name, password, namePlaceholder, passwordPlaceholder } = state;
  return (
    <>
      { user && <Navigate to="/home" replace /> }
      <div id='particles-js'>
        <form className='login'>
          <div className='login-top'>登录</div>
          <div className='login-center clearfix'>
            <div className='login-center-img'><img src={nameImg}/></div>
            <div className='login-center-input'>
              <input
                type='text'
                value={name}
                placeholder={namePlaceholder}
                onFocus={() => dispatch({ type: 'changeNamePlaceholder', payload: '' })}
                onBlur={() => dispatch({ type: 'changeNamePlaceholder', payload: '请输入您的用户名 [admin]' })}
                onChange={(e) => dispatch({ type: 'changeName', payload: e.target.value })}
              />
              <div className='login-center-input-text'>用户名</div>
            </div>
          </div>
          <div className='login-center clearfix'>
            <div className='login-center-img'><img src={pswImg}/></div>
            <div className='login-center-input'>
              <input
                type='password'
                autoComplete='off'
                value={password}
                placeholder={passwordPlaceholder}
                onFocus={() => dispatch({ type: 'changePasswordPlaceholder', payload: '' })}
                onBlur={() => dispatch({ type: 'changePasswordPlaceholder', payload: '请输入您的密码 [admin]' })}
                onChange={(e) => dispatch({ type: 'changePassword', payload: e.target.value })}
                onKeyDown={handleKeyDown}
              />
              <div className='login-center-input-text'>密码</div>
            </div>
          </div>
          <div className='login-button' onClick={handleLogin}>登 陆</div>
        </form>
      </div>
    </>
  )
}

export default compHOC(Login)