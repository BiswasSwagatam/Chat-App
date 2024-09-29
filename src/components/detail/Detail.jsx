import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useChatStore } from '../../lib/chatStore';
import { auth, db } from '../../lib/firebase'
import { useUserStore } from '../../lib/userStore';
import './detail.css'

const Detail = () => {

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef,{
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
      })
      changeBlock()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='detail'>
      <div className="user">
        <img src={user?.avatar || './avatar.png'} alt='avatar' />
        <h2>{user?.username}</h2>
        <p>etc text</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <img src='./arrowUp.png' alt='' />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src='./arrowUp.png' alt='' />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src='./arrowDown.png' alt='' />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src='https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D' alt='' />
                <span>photo_2024.png</span>
              </div>
              <img src='./download.png' alt='' className='icon' />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src='./arrowUp.png' alt='' />
          </div>
        </div>
        <button onClick={handleBlock}>
          {
            isCurrentUserBlocked ? "You are blocked!" : isReceiverBlocked ? "User blocked" : "Block User"
          }
        </button>
        <button className='logout' onClick={()=>auth.signOut()}>Logout</button>
      </div>
    </div>
  )
}

export default Detail