/** GM MODE editorial 2027 overall ratings. These are game ratings, not official MLB ratings. */
export const namedOveralls:Record<string,number>={
'shohei ohtani':99,'aaron judge':98,'bobby witt jr':97,'paul skenes':97,'juan soto':96,'tarik skubal':96,'jose ramirez':96,'mookie betts':95,'freddie freeman':94,'vladimir guerrero jr':94,'gunnar henderson':94,'yordan alvarez':94,'cal raleigh':94,'corbin carroll':93,'elly de la cruz':93,'julio rodriguez':93,'ronald acuna jr':93,'francisco lindor':93,'kyle tucker':93,'garrett crochet':93,'chris sale':92,'logan webb':92,'zack wheeler':92,'manny machado':92,'fernando tatis jr':92,'will smith':92,'jackson chourio':92,'jose altuve':91,'corey seager':91,'ketel marte':91,'matt olson':91,'bryce harper':91,'rafael devers':91,'blake snell':91,'yoshinobu yamamoto':91,'max fried':91,'jacob degrom':90,'spencer strider':90,'pete alonso':90,'alex bregman':90,'bo bichette':90,'roman anthony':90,'wyatt langford':90,'jackson merrill':90,'michael harris ii':89,'cristopher sanchez':89,'jesus luzardo':89,'cole ragans':89,'brayan bello':87,'josh naylor':87,'dansby swanson':86,'tyler glasnow':89,'nathan eovaldi':87,'aaron nola':83,'j t realmuto':83,'trea turner':89,'kyle schwarber':90,'adley rutschman':87,'corbin burnes':89,'dylan cease':87,'andres gimenez':85,'alejandro kirk':85,'logan ohoppe':83,'josh jung':84,'michael king':87,'hunter greene':87,'merrill kelly':83,'sonny gray':84,'george springer':84,'javier baez':77,'giancarlo stanton':83,'mike trout':86,'kris bryant':72
};
export function normalizePlayerName(name:string){return name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim()}
/** Every player gets a displayed OVR, even without current-season stats. */
export function overallFor(name:string,statRating?:number|null,age?:number|null){
 const curated=namedOveralls[normalizePlayerName(name)];if(curated!==undefined)return curated;
 if(statRating!=null&&statRating>0)return Math.max(50,Math.min(90,Math.round(statRating)));
 return age&&age<=24?68:age&&age>=36?66:70;
}
