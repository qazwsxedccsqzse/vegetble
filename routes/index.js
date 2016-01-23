//var mongoose = require('mongoose');
//var async = require('async');

//var WorkExp = mongoose.model('WorkExperience');
//var SchoolExp = mongoose.model('SchoolExperience');
//var Project = mongoose.model('Project');
//var SkillRate = mongoose.model('SkillsRate');
//var ContactMe = mongoose.model('ContactMe');

exports.index = function(req,res){
 /*var meta = {
 	description : '蔬菜測試',
 	keywords : '',
 	siteName : '',
 	
 };*/
 res.render( 'index',{
 	title :'青菜低加拉'
 });
};

exports.index_old = function(req,res){
	async.series(
		[
			function(callback){
				WorkExp.find({},function(err,experiences){
					if(err){
						console.log('Something wrong !');
						return;
					}
				}).exec(callback);
			},
			function(callback){
				SchoolExp.find({},function(err,schoolExperience){
					if(err){
						console.log('Something wrong 2 !');
						return;
					}
				}).exec(callback); 
			},
			function(callback){
				Project.find({},function(err,projects){
					if(err){
						console.log('Something wrong 3 !');
						return;
					}
				}).exec(callback);
			},
			function(callback){
				SkillRate.find({},function(err,skillsRate){
					if(err){
						console.log('Something wrong 4 !');
					}
				}).exec(callback);
			},
			function(callback){
				ContactMe.find({},function(err,contactMe){
					if(err){
						console.log('Something wrong 5 !');
					}
				}).exec(callback);
			}
		],function(err,results){
			var personality = '負責認真虛心，喜歡團隊合作'+'<br/>';
			personality += '樂於學習新技術，希望能用微薄的力量改變大環境'+'<br/>';
			personality += '不排斥不同領域的問題，只要有時間一定學著解決'+'<br/>';
			var extra_links = ['/css/index.css','/js/index.js'];
			
			res.render( 'index',{
				title : 'Neil Resume',
				username : 'Neil Wang',
				experiences : results[0],
				schoolExperience : results[1],
				projects : results[2],
				skillsRate : results[3],
				personality : personality,
				contactMe : results[4],
				extra_links : extra_links
			});
		}
	);
}

exports.importData = function(req,res){
	/*
	var experiences = [
		{
			job_title : 'PHP Developer',
			content : 'Develope PHP website with jQuery,AJAX,bootstrap,',
			from : '2014-6',
			to : 'now'
		},
		{
			job_title : 'Drafted into army',
			content : 'Debug ASP code in the army, also rewrite it to PHP ver.',
			from : '2012-8',
			to : '2014-6'
		}
	];
	var schoolExperience = [
		{
			schoolName : '輔仁大學 Fu Jen Catholic University',
			department : '資訊工程 Computer Science and Information Engineering',
			illustration : '參與NISRA，擔任99屆幹部 Be a core member at NISRA (Network INformation Security Research Association)'
		},
		{
			schoolName : '國立三重高中(現任新北高中) New Taipei Municipal New Taipei Senior High School',
			department : '普通科 gerneral education',
			illustration : '在高中接觸基本HTML並產生興趣而自學 Get basic information of HTML, being interesting in it and starting learning it by myself.'
		}
	];
	var projects = [
		{
			projectName : '華歌爾 Wacoal',
			url : 'http://www.wacoal.com.tw/',
			description : '第一個專案，當時主要負責會員系統，串接Facebook、Google API，並支援修改後台系統與減少MySQL SubQuery',
			usingSkills : [
					'CodeIgniter','PHP','CSS','Bootstrap','Facebook API'
				]
		},
		{
			projectName : '京典彩糖鑽 Caramelo Diamond',
			url : 'http://www.caramelo-jd.com/',
			description : '負責會員系統與商品，運用jQuery+Ajax與單純Javascript作出廠商的需求',
			usingSkills : [
					'CodeIgniter','PHP','CSS','Javascript','jQuery','AJAX','Facebook API','Bootstrap'
				]
		},
		{
			projectName : '幸福婚禮小物 Happy2u',
			url : 'http://www.happy2u.com.tw/',
			description : '負責會員登入、商品、Facebook分享送禮券、購物車與訂單流程和金流串接',
			usingSkills : [
					'CodeIgniter','PHP','CSS','Javascript','jQuery','AJAX','Facebook API','Bootstrap','國泰世華金流串接'
				]
		},
		{
			projectName : '信義居家 Living Sinyi',
			url : 'http://living.sinyi.com.tw/',
			description : '負責串接信義會員系統API與開發API給HOLA和手機APP開發商，並負責購物車與訂單流程和金流',
			usingSkills : [
					'CodeIgniter','PHP','CSS','Javascript','jQuery','AJAX','Facebook API','Bootstrap','聯信金流串接','玉山金流串接'
				]
		}
	];
	var skillsRate = [
		{ skillName : 'PHP', rate : 75 }, 
		{ skillName : 'Javascript', rate : 60 }, 
		{ skillName : 'CodeIgniter',rate : 85 } ,
		{ skillName : 'jQuery' , rate : 50 } , 
		{ skillName : 'AJAX' , rate : 80} , 
		{ skillName : 'MySQL' , rate : 70 } ,
		{ skillName : 'Bootstrap' , rate : 70 } , 
		{ skillName : 'CSS' , rate : 60 } , 
		{ skillName : 'Java' , rate : 50 } , 
		{ skillName : 'Linux' , rate : 40 },
		{ skillName : 'Nodejs', rate : 40 },
		{ skillName : 'express', rate : 40 }
	];
	var contactMe = [{
		email : 'qazwsxedccsqzse@gmail.com'
	}];

	for(var x in experiences){
		new WorkExp(experiences[x]).save(function(err){
			if(err){
				console.log('Something Wrong when saving WorkExp !');
				console.log(err);
			}
		});
	}
	for(var x in schoolExperience){
		new SchoolExp(schoolExperience[x]).save(function(err){
			if(err){
				console.log('Something Wrong when saving SchoolExp !');
				console.log(err);
			}
		});
	}
	for(var x in projects){
		new Project(projects[x]).save(function(err){
			if(err){
				console.log('Something Wrong when saving Project !');
				console.log(err);
			}
		});
	}
	for(var x in skillsRate){
		new SkillRate(skillsRate[x]).save(function(err){
			if(err){
				console.log('Something Wrong when saving SkillRate !');
				console.log(err);
			}
		});
	}
	for(var x in contactMe){
		new ContactMe(contactMe[x]).save(function(err){
			if(err){
				console.log('Something Wrong when saving ContactMe !');
				console.log(err);
			}
		});
	}
	*/
	res.send('Import success');
	res.end();
};