import { Message } from 'common/js/popup'

export const compHOC = Comp => {
  return (props) => <Comp $message={Message} {...props} />
}