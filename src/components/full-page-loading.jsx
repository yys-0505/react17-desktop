import { Spin } from "antd"

export const FullPageLoading = () => {
  const styleObj = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  return <div style={styleObj}>
    <Spin size={'large'} />
  </div>
}