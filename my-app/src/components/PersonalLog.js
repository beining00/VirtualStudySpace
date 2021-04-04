import React from 'react'
import Card from 'react-bootstrap/Card';
import ChatMessage from './ChatMessage';
import firebase, {auth} from './Firebase';
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function PersonalLog(){

  
    const emoList = ['🔥 ',"🎉 ","👏" ];
    // const messages = [
    //     {
    //         "id" :"system",
    //         'text' : "test text",
    //         'uid' : '1232434142'
            
    //     },
    //     {
    //         "id" :"system",
    //         'text' : "test text",
    //         'uid' : '1232434142'
    //     },
    //     {
    //         "id" :"system",
    //         'text' : "🎉 test text",
    //         'uid' : '1232434142'
    //     },
    //     {
    //         "id" :"system",
    //         'text' : "🎉 test text",
    //         'uid' : '1232434142'
    //     },
    //     {
    //         "id" :"system",
    //         'text' : "🎉 test text",
    //         'uid' : '1232434142'
    //     },

    // ];

    const [messageList, setMessageList] = React.useState([])
    const dummy = React.useRef();
    console.log("this is a dummy")
    console.log(dummy)
    // React.useEffect(()=>{
    //     console.log('scrolling')
    //     dummy.current.scrollIntoView({ behavior: 'smooth' });
    // },[])

    

    React.useEffect(()=>{
        // add listener to the uid log space 
        console.log(auth.currentUser.uid);
        var dfRefObj = firebase.database().ref().child('/personalLog/' + auth.currentUser.uid).limitToLast(25);;
        dfRefObj.on('value', snap =>{
            console.log("personal log changed ")
            const _messageList =[]
            const messages = snap.val()

            for (let messID in messages){
                const message = messages[messID]
                const messageContent = message.value
                const messageType = message.type

                if (messageType  == "like"){

                    if (auth.currentUser.uid == messageContent.senderID){
                        _messageList.push({
                            id : messID,
                            uid : messageContent.senderID,
                            userName : messageContent.senderName ,
                            text: "I have sent my friend " +messageContent.receiverName + " a like"})

                    }else{
                        _messageList.push({
                            id : messID,
                            uid : messageContent.senderID,
                            userName : "bot",
                            text:emoList[getRandomInt(emoList.length)] + " Your friend " + messageContent.senderName + " sent you a like :D"})

                    }
                    
                    

                }else if(messageType == 'workLog'){
                    _messageList.push({
                        id : messID,
                        uid : '0',
                        userName : "bot",
                        text: emoList[getRandomInt(emoList.length)]+  " Congraduation! you have spent " + messageContent.time + " hours on "  + messageContent.goal.toUpperCase() + " with "
                        + messageContent.workingPerc + " % focus" })
                }
            }

            console.log(_messageList)
            setMessageList(_messageList)
            dummy.current.scrollIntoView({ behavior: 'smooth' });

        })
    }, [])

    
    // const sendMessage =  ()=>{
    //     const newMessage = {
    //         "id" :"system",
    //         'text' : "[Party]test text",
    //         'uid' : '1232434142'}
    //     setMessageList([...messageList,newMessage ])
    //     //e.preventDefault();

        
        
    // }


    
    return (
        <Card.Body>
            {/* <Card.Title>Study Log</Card.Title> */}

            <Card.Text>
       
                    <main className = "chat_main">

                    {messageList.map(msg => <ChatMessage key={msg.id} message={msg} />)}

                    <span ref={dummy}></span>

                    </main>

                    
              
            </Card.Text>
        </Card.Body>
    )
}

export default PersonalLog;