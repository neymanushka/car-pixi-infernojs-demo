import { Button } from 'inferno-bootstrap';

const Panel = ({ c }) => (
    <div class="panel">
        <Button onMouseDown={ ()=>{c.onButtonDownHandler( { keyCode:38 } ) } } onMouseUp={ ()=>{c.onButtonUpHandler( { keyCode:38 } ) } } id="buttonForward" outline color="secondary" >Вперед</Button>
        <Button onMouseDown={ ()=>{c.onButtonDownHandler( { keyCode:37 } ) } } onMouseUp={ ()=>{c.onButtonUpHandler( { keyCode:37 } ) } } id="buttonLeft" outline color="secondary" >
            <img src="./sprites/arrow_left.png" width="30" />
        </Button>
        <Button onMouseDown={ ()=>{c.onButtonDownHandler( { keyCode:39 } ) } } onMouseUp={ ()=>{c.onButtonUpHandler( { keyCode:39 } ) } } id="buttonRight" outline color="secondary" >
            <img src="./sprites/arrow_right.png" width="30" />            
        </Button>
        <Button onMouseDown={ ()=>{c.onButtonDownHandler( { keyCode:40 } ) } } onMouseUp={ ()=>{c.onButtonUpHandler( { keyCode:40 } ) } } id="buttonBackward" outline color="secondary" >Назад</Button>        
        
     </div>
  ); 

export { Panel };
