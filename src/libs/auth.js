import store from '../store/index'
import firebase from 'firebase'

export default {
    
    setRole(uid,name){
        let db = firebase.firestore().collection('users')
        db.doc(uid).get().then(data => {
            if(!data.exists){
                db.doc(uid).set({
                    role:'user',
                    name:name
                }).catch( err => console.log(err))
            }
        })
    },
    loginWithGoogle(){
        return new Promise((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then((data) => {

                store.commit("SET_LOGGED_IN",true)
                store.commit("SET_USER",data.user)
                this.setRole(data.user.uid,data.user.displayName)
                this.setUserRole()
                resolve({
                    message:"Giriş İşlemi Başarılı",
                    data:data.user
                })


            }).catch((err) => {

                reject(err)

            });
        })

    },
    loginWithEmail(email,password){
        return new Promise((resolve, reject) => {
            firebase
                .auth()
                .signInWithEmailAndPassword(email,password)
                .then(data => {
                    this.setRole(data.user.uid,data.user.displayName)
                
                    store.commit("SET_LOGGED_IN", true)
                    store.commit("SET_USER", data.user)
                    this.setUserRole()
                    resolve({
                        message:"Giriş İşlemi Başarılı",
                        data:data.user
                    })
                })
                .catch(err => {

                    reject(err)
                });
        })
    },
    signUpWithEmail(email,password,name){
        return new Promise((resolve, reject) => {
            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(data => {
                    data.user.sendEmailVerification()

                    data.user.updateProfile({
                        displayName: name,
                        photoURL: "http://mymbs.co.id/public/upload/image/user/user.png",
                       
                    })
                        .then(() => {
                            
                        });
                        this.setRole(data.user.uid,data.user.displayName)
                
                        this.setUserRole()
                    store.commit("SET_LOGGED_IN", true)
                    store.commit("SET_USER", data.user)
                    resolve({
                        message:"Kayıt İşlemi Başarılı",
                        data:data.user
                    })
                })
                .catch(err => {
                   reject(err)
                });
        })
    },
    resetPassword(email){
        return new Promise((resolve, reject) => {

            firebase
                .auth()
                .sendPasswordResetEmail(email)
                .then(() => {
                    resolve({
                        message: "Şifre Sıfırlama Linki Mail Adresinize Gönderildi",

                    })
                })
                .catch(error => {
                    reject(err)
                });
        })
    },
    logout(){
        return new Promise((resolve, reject) => {
            firebase.auth().signOut().then(() => {
                resolve({
                    message: "Başarıyla Çıkış Yaptınız",

                })
                store.commit("SET_LOGGED_IN", false)
                store.commit("SET_USER", null)
            }).catch(err => {
                reject(err)
            })
        })
    },
    isAuthanticated(){
       return store.getters.isAuthanticated
    },
    getUserInfo(){
       return store.getters.getUserInfo
    },
    setUserRole(){
        firebase.firestore().collection('users').doc(store.state.user.uid).get().then(doc => {
            if(doc.exists){
                let d = doc.data()
                store.commit('SET_USER_ROLE',d.role)
            }else{
                store.commit('SET_USER_ROLE','reader')
            }
        }).catch(err =>  store.commit('SET_USER_ROLE','reader'))
    },
    getUserRole(){
        return new Promise((resolve, reject) => {
            if(this.isAuthanticated() == true){
                if(store.state.role == null){
                    firebase.firestore().collection('users').doc(store.state.user.uid).get().then(doc => {
                        if(doc.exists){
                            let d = doc.data()
                            resolve(d.role)
                        }else{
                            resolve('reader')
                        }
                    }).catch(err => reject(err))
                }else{
                    resolve(store.state.role)
                }
            }else{
                resolve('reader')
            }
        })
    }
}
/*
if(store.state.isLogged==true){
            if(store.state.role == null){
                let uid = store.state.user.uid
              
                    firebase.firestore().collection('users').doc(uid).get().then((doc) => {
                        if(doc.exists){
                            let data = doc.data()
                            store.state.role = data.role
                            resolve(data.role)
                        }else{
                            resolve('reader')
                        }
                    }).catch((err) => reject(err))
               
                }else{
                resolve(store.state.role)
                }
        }else{
            resolve('reader')
        }
*/