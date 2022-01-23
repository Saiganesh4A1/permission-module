import React, { useState } from 'react'
import { TextField, Paper, Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import WidgetsIcon from '@mui/icons-material/Widgets'; 
import Button from '@mui/material/Button';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { IconButton } from '@mui/material';
import navigate from '../../navigate.png'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';



const useStyles = makeStyles((theme) => ({
    menuPrivilege: {
        height: 'calc(100vh-60px)',
        position: 'relative',
        left: '68px',
        width: 'calc(100% - 68px)',
        padding: '30px',
        boxSizing: 'border-box',
        marginTop:'30px',
    },
    paper: {
        borderRadius: 15,
        padding: '20px',
        border: '1px solid #888888',
        boxShadow: '2px 2px #888888',
        marginBottom:'50px'
    },
    header:{
        display:'flex',
        justifyContent:'space-between',
        marginBottom: '20px',
    },
    menuIcon:{
        borderRadius: '15px',
        backgroundColor: "#3c8dbc",
        // backgroundColor: '#851D41',
        color: '#ffffff',
        // fontSize:'40px',
        marginTop: '-50px',
        width: '60px',
        height: '60px',
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigate:{
        color: '#ffffff',
        marginTop: '-50px',
        marginRight:'40px',
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
        
    },
    parentMenu:{
        display:'flex',
        justifyContent:'space-between'
    },
    menuItem:{
        display:'flex',
        alignItems:'center'
    },
    menuItemHead:{
        margin:'20px 0px'
    },
    addButton:{
        color:'#A3DA8D',
        transform:'scale(1.5)',
        margin:'5px',
    },
    deleteButton:{
        color:'red',
        transform:'scale(1.5)',
        margin:'5px',
    }

    
})
);

const Reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};



function MenuPrevilege() {
    const classes = useStyles();

    const menu=[
        {
            id:'1',
            name:'',
            order:'1',
            children:[
                {
                    id:'1',
                    name:'',
                    order:'1', 
                },
            ]
        },

    ]

    const [menus , setMenus] = useState(menu);

    const addMenu = () => {
        setMenus([...menus, {id:`${menus.length+1}`, name: '', order: '',children:[{id:'1', name: '', order: ''}] }])
    }
    const addMenuItem = (menu) => {
        console.log(menu)
        menu.children.push({id:`${menu.children.length+1}`, name: '', order: ''})
        setMenus([...menus])
    }


    const deleteMenu = (i) => {
        console.log('000i', i)
        const Menus = [...menus]
        console.log('menus before delete', Menus);
        Menus.splice(i, 1);
        setMenus(Menus);
        console.log('menus after delete', Menus)
    }
    const deleteMenuItem = (menu,i) => {
        menu.children.splice(i,1);
        setMenus([...menus])
    }


    const handleOnDragEnd = (result) => {
        console.log(">>>>>",result)
        if (!result.destination) return;
    
        if (result.type === "menus") {
            
            const menu = Reorder(
              menus,
              result.source.index,
              result.destination.index
            );
      
            setMenus(menu)
        }
        else{
            const menuItems = Reorder(
                menus[parseInt(result.type, 10)].children,
                result.source.index,
                result.destination.index
            );
            const menu = JSON.parse(JSON.stringify(menus));
            menu[result.type].children=menuItems;
            setMenus(menu)
        }
    }
    console.log(menus)

    return (
        <div className={classes.menuPrivilege}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="droppable" type='menus' >
                    {(provided, snapshot) => (
                        <div
                        ref={provided.innerRef}
                        >
                        {
                        menus.map((menu,index) => (
                            <Draggable
                                key={menu.id}
                                draggableId={menu.id}
                                index={index}
                            >
                            {(provided, snapshot) => (
                        
                                <Paper className={classes.paper} 
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                >
                                    <Box className={classes.header}>
                                        <Box className={classes.menuIcon}>
                                            <SummarizeIcon style={{transform:'scale(1.2)'}}  />
                                        </Box>
                                        <Box className={classes.navigate} {...provided.dragHandleProps}  >
                                            <img src={navigate} alt='navigate' style={{width:'25px',height:'25px'}}  />
                                        </Box>
                                    </Box>
                                    <Box className={classes.parentMenu} key={menu.id}>
                                        <TextField id="outlined-basic" label="Menu" variant="outlined" size="small" placeholder='Enter Menu Name' value={menu.name} onChange={(e)=>{menu.name=e.target.value;setMenus([...menus])}} />
                                        <Box>
                                        <Button  type="submit" variant="outlined" endIcon={< WidgetsIcon />} onClick={addMenu}>
                                            Add Menu
                                        </Button>
                                        <Button  type="submit" variant="outlined" endIcon={< WidgetsIcon />} style={{marginLeft:'10px',color:'red'}} onClick={deleteMenu} >
                                            Delete Menu
                                        </Button>
                                        </Box>
                                        
                                    </Box>
                                    
                                    <Droppable droppableId={`droppable${menu.id}`} type={`${index}`}>
                                        {(provided, snapshot) => (
                                            <div
                                            ref={provided.innerRef}
                                            >
                                            {menu.children.length>0 && <h4 className={classes.menuItemHead}>Menu Items</h4>}
                                            { menu.children.map((menuItem,i)=>(
                                                <Draggable
                                                    key={`${index}${i}`}
                                                    draggableId={`${index}${i}`}
                                                    index={i}
                                                >
                                                    {(provided, snapshot) => (
                                                        <Box 
                                                            key={menuItem.id} 
                                                            className={classes.menuItem}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                        >
                                                            <TextField id="outlined-basic" label="Menu" variant="outlined" size="small" placeholder='Enter Menu Item Name' value={menuItem.name} style={{marginRight:'20px'}} onChange={(e)=>{menuItem.name=e.target.value;setMenus([...menus])}} />
                                                            <IconButton onClick={()=> addMenuItem(menu)}>
                                                                <AddBoxIcon className={classes.addButton} />
                                                            </IconButton>
                                                            <IconButton onClick={()=>deleteMenuItem(menu,i)} >
                                                                <RemoveCircleIcon className={classes.deleteButton} />
                                                            </IconButton>
                                                            <img src={navigate} alt='navigate' style={{width:'25px',height:'25px'}} {...provided.dragHandleProps} />
                                                        </Box>
                                                    )}
                                                </Draggable>

                                            ))}
                                            {provided.placeholder}
                                            </div>
                                        )}

                                    </Droppable>
                                </Paper>
                            )}
                            
                            </Draggable>
                        ))
                    }
                        
                        {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <Button variant="contained" style={{float:'right'}}>Publish</Button>
        </div>

    )
}

export default MenuPrevilege
