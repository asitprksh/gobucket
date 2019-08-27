import React, {Component} from 'react';
import { StyleSheet,
         Text,
         View,
         AsyncStorage,
         ScrollView,
         StatusBar,
         TextInput,
         TouchableOpacity} from 'react-native';
import { Appbar,
         Button,
         Card,
         List} from 'react-native-paper';

export default class App extends Component {
  arr=[]
  id=0
  state = 
  {
    text: '',
    item:
    [
      {id:1,data:"loading"}
    ]
  };  

  storedata = async () =>
  {
    this.arr.push({id:this.id,data:this.state.text})
    this.id++;
    this.saveData()
  }

  saveData = async () =>
  {
    await AsyncStorage.setItem("mylist",JSON.stringify(this.arr));
    this.setState
    ({
      item: JSON.parse(await AsyncStorage.getItem("mylist")),
      text:''
    })
  
  }

  async componentDidMount()
  {
    this.setState
    ({
      item : JSON.parse(await AsyncStorage.getItem("mylist")) || ""
    })
    this.arr=JSON.parse(await AsyncStorage.getItem("mylist")) || []
    this.id = this.arr[this.arr.length-1].id + 1
  }

  removeItem(id)
  {
    for( var i = 0; i < this.arr.length; i++)
    { 
    console.log(this.arr[i].id === id);
      if (this.arr[i].id === id)
      {
        console.log('if',id)
        this.arr.splice(i, 1); 
         this.saveData()
      }
      else
      {
       console.log(this.arr)
      }
    }
  
  }
  
  render()
    {
      
      if(this.state.item.length > 0)
      {
        renderList = this.state.item.map(item=>{
          return (
            <Card key={item.id} style={{margin:5}}>
              <List.Item
              title={item.data}
              right={props => <TouchableOpacity onPress={this.removeItem.bind(this,item.id)}><List.Icon icon="delete"  /></TouchableOpacity>}
              />
            </Card>
          )
        })
      }
      else{
        renderList = 
        <Text style ={{marginTop:15,fontSize:25,alignSelf: 'center'}}> Bucket is empty</Text>
      }
      return(
        <ScrollView>
        <View style={styles.container}>
            <Appbar.Header style = {{backgroundColor:'#0288d1'}}>
              <Appbar.Content
                title="Go Bucket"
                style = {{alignItems:"center"}}
              /> 
            </Appbar.Header>
            <TextInput
               style = {styles.inputfield}
               value={this.state.text}
               onChangeText={text => this.setState({ text })}
               placeholder = "   Enter Bucket Item"
               maxLength = {30}
             />

             <Button  mode="contained" onPress={this.storedata} style={{margin:10,backgroundColor:'#0288d1',height:40,marginLeft:25,marginRight:25}}>
                Add To Bucket
              </Button> 
                <View>
                  {renderList}
                </View>
        </View>
        </ScrollView>
      );
    }
  }

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#d3d3d3'
  },
  inputfield:{
    height: 40,
    borderWidth: 1,
    marginRight:7,
    marginTop:7,
    marginLeft:7,
    borderColor: '#0288d1',
    backgroundColor:'white'
  }
})