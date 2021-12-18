import { useEffect,useState } from 'react';
import './App.css';

export default function App() {
  return (
    
    <Plan />
    
  )
}

function Plan() {
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUser();
  }, []);
  const getUser=() => {
    fetch("https://615c5da2c298130017736114.mockapi.io/user", { method: "GET" })
      .then((data) => data.json())
      .then((user) => setUsers(user));
  }
  const addUser=() => {
    fetch("https://615c5da2c298130017736114.mockapi.io/user", {
       method: "POST",
       headers:{"Content-Type":"application/json"},
       body:JSON.stringify({
        name: name, 
        pic: pic
       })
      }).then(()=>getUser())
    }
  return (
    <><div className="input">
      <input style={{height:'35px',width:'220px',borderRadius:'5px',margin:'10px',background:'lightblue'}}
        placeholder=" Enter Your Name"
        onChange={(event) => setName(event.target.value)} />
      <br />
      <input style={{height:'35px',width:'280px',borderRadius:'5px',margin:'10px',background:'lightblue'}}
        placeholder=" Enter Your Pic URL"
        onChange={(event) => setPic(event.target.value)} />
      <br />
      <button style={{height:'40px',width:'100px',borderRadius:'5px',background:'lightgreen'}} onClick={addUser}>
        ADD USER
      </button>
      <br />
      <br />
    </div>
    <div className="container">
        {users.map((n) => (
          <User key={n.id} username={n.name} userpic={n.pic} userid={n.id} getUser={getUser}/>
        ))}
      </div></>
  );
}

function User({ username, userpic ,userid, getUser}) {
  const deleteUser=() => {
    fetch("https://615c5da2c298130017736114.mockapi.io/user/"+ userid, {
       method: "DELETE"      
      }).then(()=>getUser())
    }
    const [edit,setEdit]=useState(false)
  return (
    <><div className="user-container">
      <img
        className="img"
        height="130"
        width="130"
        src={userpic}
        alt={username}
      ></img>
      <div>
        <p className="user-name">{username}</p>
        <button style={{margin:'5px',height:'30px',width:'70px',background:'red',borderRadius:'5px'}} onClick={deleteUser}>DELETE</button>
        <button style={{margin:'5px',height:'30px',width:'80px',background:edit?'orange':'teal',borderRadius:'5px'}} onClick={()=>setEdit(!edit)}>{edit ? "CANCEL":"EDIT"}</button>
      </div>
    </div>{edit ? <EditUser username={username} userpic={userpic} userid={userid} getUser={getUser} setEdit={setEdit}/> : ""}</>
  )};

  function EditUser({username,userpic,userid,getUser,setEdit}){
    const [name, setName] = useState(username);
    const [pic, setPic] = useState(userpic);
    const editUser=() => {
      setEdit(false)
      fetch("https://615c5da2c298130017736114.mockapi.io/user/" + userid, {
         method: "PUT",
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify({
          name: name, 
          pic: pic
         })
        }).then(()=>getUser())
      }
    return(
      <div><input style={{height:'35px',width:'260px',borderRadius:'5px',margin:'10px',background:'lightgrey'}}
      value={name}
        placeholder=" Enter Your Name"
        onChange={(event) => setName(event.target.value)} /><br />
        <input style={{height:'35px',width:'260px',borderRadius:'5px',margin:'10px',background:'lightgrey'}}
        value={pic}
          placeholder=" Enter Your Pic URL"
          onChange={(event) => setPic(event.target.value)} /><br />
          <button style={{height:'30px',width:'70px',background:'lightgreen',borderRadius:'5px'}} onClick={editUser}>
          SAVE
        </button></div>
    )

  }