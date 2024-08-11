const Test2 = (props) => {
     return (
          <div>
               I'm a parent
               <div>
                    {props.children}
               </div>
          </div>
     )
}

export default Test2;