(this.webpackJsonpcodenames=this.webpackJsonpcodenames||[]).push([[0],{122:function(e,t,a){e.exports=a.p+"static/media/default.20a5c089.jpg"},155:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MESSAGES={pong:"PONG",ping:"PING",login:"LOGIN",logout:"LOGOUT",joinGame:"JOIN_GAME",createGame:"CREATE_GAME",startGame:"START_GAME",leaveGame:"LEAVE_GAME",replayGame:"REPLAY_GAME",chooseWord:"CHOOSE_WORD",chooseSpyMaster:"CHOOSE_SPY_MASTER",playAgain:"PLAY_AGAIN",gameOver:"GAME_OVER",gameAborted:"GAME_ABORTED",newGameCreated:"NEW_GAME_CREATED",gameNotification:"GAME_NOTIFICATION",words:"WORDS",playersInfo:"PLAYERS_INFO",spyMastersInfo:"SPYMASTERS_INFO",cardInfo:"CARD_INFO"}},203:function(e,t,a){e.exports=a(361)},208:function(e,t,a){},312:function(e,t,a){},314:function(e,t,a){"use strict";function n(e){for(var a in e)t.hasOwnProperty(a)||(t[a]=e[a])}Object.defineProperty(t,"__esModule",{value:!0}),n(a(315)),n(a(316))},315:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.RESPONSE_CODES={success:"SUCCESS",failed:"FAILED",loginFailed:"LOGIN_FAILED",loginSuccess:"LOGIN_SUCCESS",gameNotification:"GAME_NOTIFICATION"}},316:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.error=0]="error",e[e.info=1]="info"}(t.ResponseType||(t.ResponseType={}))},317:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(155);t.loginPayload=function(e){return{operation:n.MESSAGES.login,payload:{name:e}}},t.createGamePayload=function(e){return{operation:n.MESSAGES.createGame,payload:{playerId:e}}},t.joinGamePayload=function(e,t){return{operation:n.MESSAGES.joinGame,payload:{playerId:e,gameId:t}}},t.startGamePayload=function(e){return{operation:n.MESSAGES.startGame,payload:{gameId:e}}},t.chooseWordPayload=function(e,t,a){return{operation:n.MESSAGES.chooseWord,payload:{gameId:e,playerId:t,word:a}}},t.chooseSpyMasterPayload=function(e,t){return{operation:n.MESSAGES.chooseSpyMaster,payload:{gameId:e,playerId:t}}},t.leaveGamePayload=function(e,t){return{operation:n.MESSAGES.leaveGame,payload:{gameId:e,playerId:t}}},t.replayGamePayload=function(e,t){return{operation:n.MESSAGES.replayGame,payload:{gameId:e,playerId:t}}},t.pingPayload=function(){return{operation:n.MESSAGES.ping,payload:{ping:"ping"}}}},318:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.Blue=0]="Blue",e[e.Red=1]="Red",e[e.Civilian=2]="Civilian",e[e.Assasin=3]="Assasin"}(t.CardType||(t.CardType={})),function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Over=2]="Over",e[e.Aborted=3]="Aborted"}(t.GameStatus||(t.GameStatus={}))},321:function(e,t,a){},322:function(e,t,a){},356:function(e,t){},361:function(e,t,a){"use strict";a.r(t);var n,r,o,i,s,c,u,l=a(0),m=a.n(l),h=a(15),d=a(12),f=a.n(d),p=(a(208),a(13)),b=a(26),y=a(10),g=a(17),v=a(18),E=a(404),O=a(402),j=a(403),S=a(407),I=function(e){Object(v.a)(a,e);var t=Object(g.a)(a);function a(){return Object(p.a)(this,a),t.apply(this,arguments)}return Object(y.a)(a,[{key:"render",value:function(){return m.a.createElement("div",null,m.a.createElement(j.a,{as:"h4",attached:"top"},"How to play!"),m.a.createElement(S.a,{attached:!0},m.a.createElement("ul",null,m.a.createElement("h5",null,"How To"),m.a.createElement("li",null,"Sign in with any name to play"),m.a.createElement("li",null,"Afer successfully signing in you can either create a new game or join an existing one"),m.a.createElement("li",null,"If creating a new game, you will get a game ID which you can share with people you wish join the game"),m.a.createElement("li",null,'To join an existing game simply click "Join Game" and enter the ID of the game you want to join'))))}}]),a}(l.Component),k=a(39),w=a(9),C=a.n(w),G=a(21),x=a(400),M=a(406),N=a(59),A=(a(312),Object(h.b)("store")(n=Object(h.c)(n=function(e){Object(v.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).inputRef=void 0,n.onSubmit=function(e){e.preventDefault(),n.onSignIn()},n.onSignIn=Object(G.a)(C.a.mark((function e(){return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.store.signIn(n.state.name);case 2:n.inputRef&&(n.inputRef.value="");case 3:case"end":return e.stop()}}),e)}))),n.state={name:""},n.handleChange=n.handleChange.bind(Object(b.a)(n)),n.onSignIn=n.onSignIn.bind(Object(b.a)(n)),n}return Object(y.a)(a,[{key:"store",get:function(){return this.props.store}}]),Object(y.a)(a,[{key:"render",value:function(){return m.a.createElement(x.a,{className:"form",onSubmit:this.onSubmit},m.a.createElement(x.a.Group,{controlId:"formPlaintextEmail"},m.a.createElement(x.a.Label,{className:"label"},"Name"),m.a.createElement(x.a.Control,{plaintext:!0,placeholder:"your name goes here",className:"input",value:this.state.name,onChange:this.handleChange})),m.a.createElement(M.a,{variant:"primary",size:"lg",block:!0,className:"primary-button",onClick:this.onSignIn},"Sign In"))}},{key:"handleChange",value:function(e){this.setState({name:e.target.value})}}]),a}(l.Component))||n)||n),T=Object(h.b)("store")(r=Object(h.c)(r=function(e){Object(v.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).onCreateGame=Object(G.a)(C.a.mark((function e(){return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.store.createGame();case 2:case"end":return e.stop()}}),e)}))),n.onJoinGame=Object(G.a)(C.a.mark((function e(){return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.store.joinGame(n.state.gameId);case 2:case"end":return e.stop()}}),e)}))),n.handleShow=Object(G.a)(C.a.mark((function e(){return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.setState(Object(k.a)({},n.state,{show:!0}));case 1:case"end":return e.stop()}}),e)}))),n.handleClose=Object(G.a)(C.a.mark((function e(){return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.setState(Object(k.a)({},n.state,{show:!1}));case 1:case"end":return e.stop()}}),e)}))),n.state={show:!1,gameId:""},n.onCreateGame=n.onCreateGame.bind(Object(b.a)(n)),n.onJoinGame=n.onJoinGame.bind(Object(b.a)(n)),n.handleShow=n.handleShow.bind(Object(b.a)(n)),n.handleClose=n.handleClose.bind(Object(b.a)(n)),n.handleGameIdChange=n.handleGameIdChange.bind(Object(b.a)(n)),n}return Object(y.a)(a,[{key:"store",get:function(){return this.props.store}}]),Object(y.a)(a,[{key:"render",value:function(){var e;return(null===(e=this.props.store)||void 0===e?void 0:e.user.isSignedIn)?m.a.createElement(m.a.Fragment,null,m.a.createElement(x.a,{className:"main-menu"},m.a.createElement(M.a,{variant:"primary",size:"lg",block:!0,className:"primary-button",onClick:this.onCreateGame},"Create New Game"),m.a.createElement("br",null),m.a.createElement(M.a,{variant:"primary",size:"lg",block:!0,className:"primary-button",onClick:this.handleShow},"Join Existing Game")),m.a.createElement(N.a,{show:this.state.show,onHide:this.handleClose,"aria-labelledby":"contained-modal-title-vcenter",centered:!0},m.a.createElement(N.a.Header,{closeButton:!0},m.a.createElement(N.a.Title,null,"Enter ID of game to join")),m.a.createElement(N.a.Body,null,m.a.createElement(x.a,{className:"form"},m.a.createElement(x.a.Group,{controlId:"formPlaintextEmail"},m.a.createElement(x.a.Control,{plaintext:!0,placeholder:"game ID goes here",className:"input",value:this.state.gameId,onChange:this.handleGameIdChange})))),m.a.createElement(N.a.Footer,null,m.a.createElement(M.a,{variant:"secondary",onClick:this.handleClose},"Close"),m.a.createElement(M.a,{variant:"primary",onClick:this.onJoinGame},"Join Game")))):m.a.createElement(A,null)}},{key:"handleGameIdChange",value:function(e){this.setState(Object(k.a)({},this.state,{gameId:e.target.value}))}}]),a}(l.Component))||r)||r,P=a(7),R=a(405),_=a(91),F=a.n(_),D=a(92),L=a.n(D),B=a(93),W=a.n(B),H=a(94),q=a.n(H),z=a(122),J=a.n(z),U=function(e){Object(v.a)(a,e);var t=Object(g.a)(a);function a(e){return Object(p.a)(this,a),t.call(this,e)}return Object(y.a)(a,[{key:"onClick",value:function(e){this.props.onClick(e)}},{key:"render",value:function(){var e=this,t=this.props.card,a={width:"11rem"};return void 0===t.type||t.chosen||(a.boxShadow="0 0 2rem ".concat(this.cardHighlightColour(t)),a.border="0.5rem solid ".concat(this.cardHighlightColour(t)),a.borderRadius="5px"),m.a.createElement(R.a,{onClick:function(){return e.onClick(t.word)},style:a,key:t.word},m.a.createElement(R.a.Img,{variant:"top",src:this.cardImage(t),style:{height:"11rem"}}),m.a.createElement(R.a.Body,null,m.a.createElement(R.a.Title,null,t.word)))}},{key:"cardHighlightColour",value:function(e){switch(e.type){case P.CardType.Assasin:return"#000000";case P.CardType.Blue:return"#0000FF";case P.CardType.Red:return"#FF0000";case P.CardType.Civilian:return"#E1C699";default:return console.log("should not hit this"),"#FFFFFF"}}},{key:"cardImage",value:function(e){if(!e.chosen)return J.a;switch(e.type){case P.CardType.Assasin:return q.a;case P.CardType.Blue:return F.a;case P.CardType.Red:return L.a;case P.CardType.Civilian:return W.a;default:return J.a}}}]),a}(l.Component),Y=a(391),V=a(180),$=function(e){Object(v.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).COLS=5,n.state={cardTable:n.cardTable(n.props.cards)},n}return Object(y.a)(a,[{key:"cardTable",value:function(e){var t=this,a=[],n=[];return e.forEach((function(e,r){n.push(e),0!==r&&(r+1)%t.COLS===0&&(a.push(n),n=[])})),a}},{key:"componentDidUpdate",value:function(e){this.props!==e&&this.setState(Object(k.a)({},this.state,{cardTable:this.cardTable(this.props.cards)}))}},{key:"render",value:function(){var e=this.props.onCardClick;return this.state.cardTable.map((function(t){return m.a.createElement(Y.a,null,t.map((function(t){return m.a.createElement(V.a,{md:"auto"},m.a.createElement(U,{key:t.word,card:t,onClick:e}))})))}))}}]),a}(l.Component),K=a(399),Q=a(401),X=a(398),Z=a(396),ee=a(397),te=a(395),ae=Object(h.b)("store")(o=Object(h.c)(o=function(e){Object(v.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).onStartGame=Object(G.a)(C.a.mark((function e(){return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.store.startGame();case 2:case"end":return e.stop()}}),e)}))),n.onStartGame=n.onStartGame.bind(Object(b.a)(n)),n}return Object(y.a)(a,[{key:"store",get:function(){return this.props.store}}]),Object(y.a)(a,[{key:"render",value:function(){if(this.store.game.status!==P.GameStatus.New)throw new Error("Cards need to be present");return m.a.createElement(N.a.Dialog,null,m.a.createElement(N.a.Header,null,m.a.createElement(N.a.Title,null,"Game Id: ",this.store.game.id)),m.a.createElement(N.a.Body,null,this.formattedPlayerNames),m.a.createElement(N.a.Footer,null,m.a.createElement(M.a,{variant:"primary",onClick:this.onStartGame},"Start Game")))}},{key:"formattedPlayerNames",get:function(){var e;return null===(e=this.store.game.players)||void 0===e?void 0:e.map((function(e){return m.a.createElement("h4",null,e,m.a.createElement("br",null))}))}}]),a}(l.Component))||o)||o,ne=function(e){Object(v.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).COLS=5,n.state={typeTable:n.typeTable(n.props.cards)},n}return Object(y.a)(a,[{key:"typeTable",value:function(e){var t=this,a=[],n=[];return e.forEach((function(e,r){if(null==e.type)throw new Error("Missing type for card ".concat(e.word));n.push(e.type),0!==r&&(r+1)%t.COLS===0&&(a.push(n),n=[])})),a}},{key:"render",value:function(){var e=this;return m.a.createElement(m.a.Fragment,null,m.a.createElement(j.a,{as:"h4",attached:"top"},"Spy Masters Grid"),m.a.createElement(S.a,{attached:!0},this.state.typeTable.map((function(t){return m.a.createElement(Y.a,null,t.map((function(t){return m.a.createElement(V.a,{md:"auto"},m.a.createElement(R.a,{style:{width:"5rem"}},m.a.createElement(R.a.Img,{src:e.typeImage(t)})))})))}))))}},{key:"typeImage",value:function(e){switch(e){case P.CardType.Assasin:return q.a;case P.CardType.Blue:return F.a;case P.CardType.Red:return L.a;case P.CardType.Civilian:return W.a;default:return console.log("should not be reached"),""}}}]),a}(l.Component),re=Object(h.b)("store")(i=Object(h.c)(i=function(e){Object(v.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).handleSnackbarClose=function(){n.store.clearNotifications()},n.handleDialogClose=function(){n.store.clearGameOverReason()},n.onCardClick=function(e){n.store.chooseWord(e)},n}return Object(y.a)(a,[{key:"store",get:function(){return this.props.store}}]),Object(y.a)(a,[{key:"render",value:function(){if(this.store.game.status===P.GameStatus.New)return m.a.createElement(ae,null);if(null==this.store.game.cards||0===this.store.game.cards.length)throw new Error("Cards need to be present");return m.a.createElement(m.a.Fragment,null,m.a.createElement(Y.a,null,m.a.createElement(V.a,{md:"auto"},m.a.createElement($,{cards:this.store.game.cards,onCardClick:this.onCardClick})),m.a.createElement(V.a,{md:"auto"},this.store.user.isSpymMaster&&m.a.createElement(ne,{cards:this.store.game.cards}))),m.a.createElement(E.a,{open:this.store.newNotification,autoHideDuration:6e3,onClose:this.handleSnackbarClose},m.a.createElement(O.a,{onClose:this.handleSnackbarClose,elevation:6,variant:"filled",severity:"info"},this.store.notification)),m.a.createElement(Q.a,{open:this.store.game.status===P.GameStatus.Over&&!!this.store.game.gameOverReason,onClose:this.handleDialogClose,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",fullWidth:!0,maxWidth:"sm"},m.a.createElement(te.a,{id:"alert-dialog-title"},"Game Over!"),m.a.createElement(Z.a,null,m.a.createElement(ee.a,{id:"alert-dialog-description"},this.store.game.gameOverReason)),m.a.createElement(X.a,null,m.a.createElement(K.a,{onClick:this.handleDialogClose,color:"primary"},"Close"))))}}]),a}(l.Component))||i)||i,oe=Object(h.b)("store")(s=Object(h.c)(s=function(e){Object(v.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).onBeSpyMaster=function(){n.store.chooseSpyMaster()},n.onLeaveGame=function(){n.store.leaveGame()},n.onReplayGame=function(){n.store.replayGame()},n}return Object(y.a)(a,[{key:"store",get:function(){return this.props.store}}]),Object(y.a)(a,[{key:"render",value:function(){var e,t;return m.a.createElement("div",null,m.a.createElement(j.a,{as:"h4",attached:"top"},"Menu",this.store.game.status===P.GameStatus.Over&&m.a.createElement("input",{type:"button",value:"Start New Game",style:{float:"right"},onClick:this.onReplayGame}),m.a.createElement("input",{type:"button",value:"Leave Game",style:{float:"right"},onClick:this.onLeaveGame})),m.a.createElement(S.a,{attached:!0},m.a.createElement("div",null,"Players: ",null===(e=this.store.game.players)||void 0===e?void 0:e.join(" , ")),m.a.createElement("div",null,"Spy Masters: ",null===(t=this.store.game.spyMasters)||void 0===t?void 0:t.join(" & "),m.a.createElement("input",{type:"button",value:"Be Spy Master!",onClick:this.onBeSpyMaster,style:{float:"right"}}))))}}]),a}(l.Component))||s)||s,ie=(a(321),Object(h.b)("store")(c=Object(h.c)(c=function(e){Object(v.a)(a,e);var t=Object(g.a)(a);function a(e){return Object(p.a)(this,a),t.call(this,e)}return Object(y.a)(a,[{key:"store",get:function(){return this.props.store}}]),Object(y.a)(a,[{key:"render",value:function(){return this.store.game.id?m.a.createElement(l.Fragment,null,m.a.createElement(oe,null),m.a.createElement(re,null)):m.a.createElement(l.Fragment,null,m.a.createElement(I,null),m.a.createElement(T,null))}}]),a}(l.Component))||c)||c),se=(a(322),Object(h.b)("store")(u=Object(h.c)(u=function(e){Object(v.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).handleErrorClose=n.handleErrorClose.bind(Object(b.a)(n)),n}return Object(y.a)(a,[{key:"store",get:function(){return this.props.store}}]),Object(y.a)(a,[{key:"handleErrorClose",value:function(){this.store.clearErrors()}},{key:"render",value:function(){return m.a.createElement(m.a.Fragment,null,m.a.createElement(ie,null),m.a.createElement(E.a,{open:!!this.store.game.error,autoHideDuration:1e4,onClose:this.handleErrorClose},m.a.createElement(O.a,{elevation:6,variant:"filled",severity:"error",onClose:this.handleErrorClose},this.store.game.error)))}}]),a}(l.Component))||u)||u);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ce,ue,le,me,he,de,fe,pe=a(100),be=a(45),ye=(a(323),a(14)),ge=a(101),ve=a(183),Ee=document.location.protocol+"//"+document.location.host,Oe=ve.connect(Ee,{timeout:2e5}),je=function(){function e(t){var a=this;Object(p.a)(this,e),this.subscribeToNotifications=t,Oe.on("data",this.subscribeToNotifications),setInterval((function(){a.ping().then((function(){return""}))}),3e4)}return Object(y.a)(e,[{key:"signIn",value:function(e){return this.sendRequest(Object(P.loginPayload)(e))}},{key:"createGame",value:function(e){return this.sendRequest(Object(P.createGamePayload)(e))}},{key:"joinGame",value:function(e,t){return this.sendRequest(Object(P.joinGamePayload)(e,t))}},{key:"startGame",value:function(e){return this.sendRequest(Object(P.startGamePayload)(e))}},{key:"chooseWord",value:function(e,t,a){return this.sendRequest(Object(P.chooseWordPayload)(e,t,a))}},{key:"chooseSpyMaster",value:function(e,t){return this.sendRequest(Object(P.chooseSpyMasterPayload)(e,t))}},{key:"leaveGame",value:function(e,t){return this.sendRequest(Object(P.leaveGamePayload)(e,t))}},{key:"replayGame",value:function(e,t){return this.sendRequest(Object(P.replayGamePayload)(e,t))}},{key:"ping",value:function(){return this.sendRequest(Object(P.pingPayload)())}},{key:"openConnection",value:function(){Oe.connected||Oe.connect()}},{key:"sendRequest",value:function(e){return this.openConnection(),new Promise((function(t,a){Oe.emit("data",e,(function(e,n){e?a(e):(n.type===P.ResponseType.error&&a(n.message),t(n.payload||!0))}))}))}}]),e}(),Se=new(ce=Object(ge.persist)("object"),ue=Object(ge.persist)("object"),le=Object(ge.persist)("object"),me=function(){function e(){var t=this;Object(p.a)(this,e),Object(pe.a)(this,"gameInfo",he,this),Object(pe.a)(this,"userInfo",de,this),Object(pe.a)(this,"notificationText",fe,this),this.gameService=void 0,this.subscribeToNotifications=function(e){var a,n=e.message;if(n)t.gameInfo.error=n;else{var r=e.payload||{},o=r.action,i=void 0===o?"":o,s=r.data,c=void 0===s?{}:s;switch(i){case P.MESSAGES.words:t.gameInfo.cards=c.words.map((function(e){return{word:e,chosen:!1}})),t.gameInfo.status=P.GameStatus.InProgress;break;case P.MESSAGES.playersInfo:t.gameInfo.players=c.players;break;case P.MESSAGES.cardInfo:var u=c;if(null==t.gameInfo.cards)break;var l=null===(a=t.gameInfo.cards)||void 0===a?void 0:a.findIndex((function(e){return e.word===u.word}));t.gameInfo.cards=t.gameInfo.cards.map((function(e,t){return t===l?Object(k.a)({},u,{chosen:!0}):e}));break;case P.MESSAGES.spyMastersInfo:t.gameInfo.spyMasters=c.players;break;case P.MESSAGES.gameNotification:t.notificationText=c.notification;break;case P.MESSAGES.gameAborted:t.initializeStore(),t.gameInfo.error=c.reason||"Ooops Something went wrong. Sorry for the incovenience";break;case P.MESSAGES.gameOver:t.gameInfo.status=P.GameStatus.Over,t.gameInfo.gameOverReason=c.reason||"The game is over !";break;case P.MESSAGES.newGameCreated:var m=c.gameId;t.gameInfo={id:m,status:P.GameStatus.New},t.userInfo=Object(k.a)({},t.userInfo,{isSpymMaster:!1,gameId:m});break;default:console.log("Default case. Shouldn't hit this. operation: ".concat(i))}}},this.gameService=new je(this.subscribeToNotifications),this.initializeStore()}return Object(y.a)(e,[{key:"ping",value:function(){var e=Object(G.a)(C.a.mark((function e(){return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.gameService.ping();case 3:this.gameInfo.isConnected=!0,e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),this.gameInfo.error=e.t0;case 9:case"end":return e.stop()}}),e,this,[[0,6]])})));return function(){return e.apply(this,arguments)}}()},{key:"signIn",value:function(){var e=Object(G.a)(C.a.mark((function e(t){var a;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.gameService.signIn(t);case 3:a=e.sent,this.setUserInfo(a),this.userInfo.isSignedIn=!0,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),this.gameInfo.error=e.t0;case 11:case"end":return e.stop()}}),e,this,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()},{key:"setUserInfo",value:function(e){this.userInfo=e}},{key:"createGame",value:function(){var e=Object(G.a)(C.a.mark((function e(){var t;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=this.userInfo.id){e.next=2;break}throw new Error("Login first");case 2:return e.prev=2,e.next=5,this.gameService.createGame(this.userInfo.id);case 5:t=e.sent,this.gameInfo=t,this.userInfo.gameId=t.id,e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),this.gameInfo.error=e.t0;case 13:case"end":return e.stop()}}),e,this,[[2,10]])})));return function(){return e.apply(this,arguments)}}()},{key:"joinGame",value:function(){var e=Object(G.a)(C.a.mark((function e(t){var a;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=this.userInfo.id){e.next=2;break}throw new Error("Login first");case 2:return e.prev=2,e.next=5,this.gameService.joinGame(this.userInfo.id,t);case 5:a=e.sent,this.gameInfo=a,this.userInfo.gameId=a.id,e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),this.gameInfo.error=e.t0;case 13:case"end":return e.stop()}}),e,this,[[2,10]])})));return function(t){return e.apply(this,arguments)}}()},{key:"startGame",value:function(){var e=Object(G.a)(C.a.mark((function e(){return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.gameInfo.id){e.next=2;break}throw new Error("Ned to join game first");case 2:return e.prev=2,e.next=5,this.gameService.startGame(this.gameInfo.id);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),this.gameInfo.error=e.t0;case 10:case"end":return e.stop()}}),e,this,[[2,7]])})));return function(){return e.apply(this,arguments)}}()},{key:"chooseWord",value:function(){var e=Object(G.a)(C.a.mark((function e(t){return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.gameInfo.id){e.next=2;break}throw new Error("Need to join game first");case 2:if(null!=this.userInfo.id){e.next=4;break}throw new Error("Login first");case 4:return e.prev=4,e.next=7,this.gameService.chooseWord(this.gameInfo.id,this.userInfo.id,t);case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(4),this.gameInfo.error=e.t0;case 12:case"end":return e.stop()}}),e,this,[[4,9]])})));return function(t){return e.apply(this,arguments)}}()},{key:"chooseSpyMaster",value:function(){var e=Object(G.a)(C.a.mark((function e(){var t,a;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.gameInfo.id){e.next=2;break}throw new Error("Need to join game first");case 2:if(this.user.id){e.next=4;break}throw new Error("Need to login first");case 4:return e.prev=4,e.next=7,this.gameService.chooseSpyMaster(this.gameInfo.id,this.user.id);case 7:a=e.sent,null===(t=this.gameInfo.cards)||void 0===t||t.forEach((function(e,t){e.type=a[t].type})),this.user.isSpymMaster=!0,e.next=15;break;case 12:e.prev=12,e.t0=e.catch(4),this.gameInfo.error=e.t0;case 15:case"end":return e.stop()}}),e,this,[[4,12]])})));return function(){return e.apply(this,arguments)}}()},{key:"leaveGame",value:function(){var e=Object(G.a)(C.a.mark((function e(){return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.gameInfo.id){e.next=2;break}throw new Error("Need to join game first");case 2:if(this.user.id){e.next=4;break}throw new Error("Need to login first");case 4:try{this.gameService.leaveGame(this.gameInfo.id,this.user.id),this.initializeStore()}catch(t){this.gameInfo.error=t}case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"replayGame",value:function(){var e=Object(G.a)(C.a.mark((function e(){return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.gameInfo.id){e.next=2;break}throw new Error("Need to join game first");case 2:if(this.user.id){e.next=4;break}throw new Error("Need to login first");case 4:try{this.gameService.replayGame(this.gameInfo.id,this.user.id)}catch(t){this.gameInfo.error=t}case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"setNotification",value:function(e){this.notificationText=e}},{key:"clearNotifications",value:function(){this.notificationText=""}},{key:"clearErrors",value:function(){this.gameInfo.error=""}},{key:"clearGameOverReason",value:function(){this.gameInfo.gameOverReason=""}},{key:"initializeStore",value:function(){this.gameInfo={},this.userInfo=Object(k.a)({},this.userInfo,{isSpymMaster:!1,gameId:void 0})}},{key:"user",get:function(){return this.userInfo}},{key:"game",get:function(){return this.gameInfo}},{key:"newNotification",get:function(){return!!this.notificationText}},{key:"notification",get:function(){return this.notificationText}}]),e}(),he=Object(be.a)(me.prototype,"gameInfo",[ce,ye.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return{}}}),de=Object(be.a)(me.prototype,"userInfo",[ue,ye.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return{}}}),fe=Object(be.a)(me.prototype,"notificationText",[le,ye.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),Object(be.a)(me.prototype,"user",[ye.computed],Object.getOwnPropertyDescriptor(me.prototype,"user"),me.prototype),Object(be.a)(me.prototype,"game",[ye.computed],Object.getOwnPropertyDescriptor(me.prototype,"game"),me.prototype),Object(be.a)(me.prototype,"newNotification",[ye.computed],Object.getOwnPropertyDescriptor(me.prototype,"newNotification"),me.prototype),Object(be.a)(me.prototype,"notification",[ye.computed],Object.getOwnPropertyDescriptor(me.prototype,"notification"),me.prototype),me);a(359),a(360);f.a.render(m.a.createElement(h.a,{store:Se},m.a.createElement(se,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},7:function(e,t,a){"use strict";function n(e){for(var a in e)t.hasOwnProperty(a)||(t[a]=e[a])}Object.defineProperty(t,"__esModule",{value:!0}),n(a(314)),n(a(155)),n(a(317)),n(a(318))},91:function(e,t,a){e.exports=a.p+"static/media/blue.a91846a9.jpeg"},92:function(e,t,a){e.exports=a.p+"static/media/red.e34ad243.jpeg"},93:function(e,t,a){e.exports=a.p+"static/media/civilian.75a5f2bf.jpg"},94:function(e,t,a){e.exports=a.p+"static/media/assasin.60a0e58c.jpg"}},[[203,1,2]]]);
//# sourceMappingURL=main.4b7396da.chunk.js.map