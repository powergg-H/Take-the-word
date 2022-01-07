import React ,{Component}from 'react'

const Lazy =(Com)=>{
    return class extends Component {
        state={
            Components:null
        }
        componentDidMount(){
          Com().then(res=>{
              if(res.default){
                  this.setState({
                      Components:res.default
                  })
              }
          })
        }
        render(){
            const {Components} =this.state;
              return Components?<Components {...this.props} />:<div/>
        }
    }
}

export default Lazy