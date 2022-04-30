import { message } from "antd";

export const Message = {
  success(content = '操作成功', { key = '', duration = 2 } = {}) {
    message.success({
      content,
      duration,
      key
    })
  },
  error(content = '操作失败', { key = '', duration = 3 } = {}) {
    message.error({
      content,
      duration,
      key
    })
  },
  loading(content = '请稍后', { key = '', duration = 0 } = {}) {
    message.loading({
      content,
      duration,
      key
    })
  }
}