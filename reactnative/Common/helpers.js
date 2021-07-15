import apiConfig from '../Base/apiConfig';

export default {
    updateUser: function(user){
      var q = apiConfig.server+apiConfig.usersDbUrl+"/users/"+user._key
      //console.log(q)
      fetch(q,{
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
          .then(result=>result.json())
          .then(u=>{
              //console.log(u);
              console.log("User updated");
          });
    },
    createUser: function(user,cb){
      var q = apiConfig.server+apiConfig.usersUrl+"/users/"
      console.log(q)
      fetch(q,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
          .then(result=>result.json())
          .then(u=>{
              //console.log(u);
              cb(Object.assign(user,u));
          });
    },

    getUser:function (user,cb){
      var q = apiConfig.server+apiConfig.usersUrl+"/users/"+user.sub
      //console.log(q)
      fetch(q)
          .then(result=>result.json())
          .then(u=>{
              if(u.length===0){
                console.log(user)
                this.createUser(user, cb);
              }
              else{
                cb(Object.assign(user,u[0]));
              }
              //console.log(u);

          });
    },

    editUser:function (user,cb){
      console.log(user);
      user._rev=null;
      var q = apiConfig.server+apiConfig.usersUrl+"/users/"+user._key
      fetch(q,{
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
          .then(result=>result.json())
          .then(updatedUser=>{
              //console.log(updatedAsset);
              //assets.push(asset);
              cb(user);
          });
    }
}
