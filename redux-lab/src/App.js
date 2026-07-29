import PostCounter from "./components/PostCounter";
import AddPost from "./components/AddPost";
import PostList from "./components/PostList";


function App(){

return(

<div>

<h1>
Redux Toolkit Post Counter
</h1>


<PostCounter/>

<AddPost/>

<PostList/>


</div>

);

}


export default App;