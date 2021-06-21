import Letra from "../../models/Letra";

export const DELETE_LETRA = 'DELETE_LETRA';
export const CREATE_LETRA = 'CREATE_LETRA';
export const UPDATE_LETRA = 'UPDATE_LETRA';
export const SET_LETRA = 'SET_LETRA';
export const fetchLetras = () =>
{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products.json
    return async (dispatch,getState) =>{
        try {
        const userId = getState().auth.userId;
        const response = await fetch('https://finanzasapp-dff53-default-rtdb.firebaseio.com/letras.json');
        if(!response.ok){
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        const loadedLetras = [];
        for(const letra in resData){
            loadedLetras.push(
                new Letra(
                letra,
                resData[letra].ownerId,
                resData[letra].title,
                resData[letra].imageUrl,
                resData[letra].description,
                resData[letra].price)
            );
        }
        dispatch({
            type:SET_LETRA,
            letras:loadedLetras,
            userLetras:loadedLetras.filter(letr=>letr.ownerId===userId)
        })
        } catch (error) {
            throw error;
        }
        
    }
}
export const deletLetra = letrasId =>{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}
    return async (dispatch,getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const res = await fetch(`https://finanzasapp-dff53-default-rtdb.firebaseio.com/letras/${letrasId}.json?auth=${token}`,{
        method:'DELETE'
        });
        
        if(!res.ok){
            throw new Error('Something went wrong!')
        }
        dispatch({
            type:DELETE_LETRA,lid:letrasId
        })
    }
}
export const createLetra = (title,description,imageUrl,price) =>
{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products.json?auth=${token}
    return async (dispatch,getState)=>{
     //ANY ASYNC CODE YOU WANT
     const token = getState().auth.token;
     const userId = getState().auth.userId;
     const response = await fetch(`https://finanzasapp-dff53-default-rtdb.firebaseio.com/letras.json?auth=${token}`
     ,{
         method:'POST',
         headers:{
             'Content-Type':'application/json'
         },
         body:JSON.stringify({
             title,
             description,
             imageUrl,
             price,
             ownerId:userId
         })
     });
     const resData = await response.json();
    //  console.log(resData);
      dispatch({
        type:CREATE_LETRA,
        LetraData:{
        id:resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId:userId
      }
    }
    ); 

    }
    
}
export const updateLetra = (id,title,description,imageUrl) =>
{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}
    return async (dispatch,getState)=>{
        // console.log(getState);
        const token = getState().auth.token;
        const res = await fetch(
            `https://finanzasapp-dff53-default-rtdb.firebaseio.com/letras/${id}.json?auth=${token}`
            ,{
             method:'PATCH', //PUT VA A SOBREESCRIBAR SOBRE LA NUEVA DATA, PATCH VA A ACTUALIZAD DONDE DGIAS QUE ACTUALICE
             headers:{
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({
                 title,
                 description,
                 imageUrl,
             })
         });
         if(!res.ok){
            throw new Error('Something went wrong!')
        }
        dispatch({
        type:UPDATE_LETRA,
        lid:id,
        LetraData:{
        title,
        description,
        imageUrl
        }
    });
        
    }

}