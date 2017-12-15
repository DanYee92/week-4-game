var obi = {
	name: "obi",
	health: 120,
	attackPower: 8,
	attackAdd: 8,
	counterAtk: 15,
}

var maul = {
	name: "maul",
	health: 180,
	attackPower: 7,
	attackAdd: 7,
	counterAtk: 25,
}

var luke = {
	name: "luke",
	health: 100,
	attackPower: 14,
	attackAdd: 14,
	counterAtk: 5,
}

var sidious = {
	name: "sidious",
	health: 150,
	attackPower: 8,
	attackAdd: 8,
	counterAtk: 20,
}

var chosen;
var opponent;
function choosePlayer() {
		$('.enemy').append($('.toChoose'));
		$('.chosen').append(this);
		chosen = $(this).attr('id');

		if (chosen == "maul") {
			chosen = maul;
		}
		if (chosen == "luke") {
			chosen = luke;
		}
		if (chosen == "obi") {
			chosen = obi;
		}
		if (chosen == "sidious") {
			chosen = sidious;
		}
		$('#chosenHealth').html(chosen.health);
		$('.toChoose').on('click', pickEnemy);


}

function pickEnemy (){
		$('.toFight').append(this);
		opponent = $(this).attr('id');
		if (opponent == "sidious") {
			opponent = sidious;
		}
		if (opponent == "obi") {
			opponent = obi;
		}
		if (opponent == "luke") {
			opponent = luke;
		}
		if (opponent == "maul") {
			opponent = maul;
		}
		$('#opponentHealth').html(opponent.health)
		$('.fight-info').append('<button class="btn-attack btn btn-danger">Attack</button>');
		$('.btn-attack').click(attack);

}
if(opponent != "undefined"){
	$('.toChoose').click(function(){
    	$('.toChoose').unbind('click', pickEnemy);
    });
}



function attack () {
	opponent.health -= chosen.attackPower;
	chosen.health -= opponent.counterAtk;
	chosen.attackPower += chosen.attackAdd;
	$('.toFight .health').html(opponent.health);
	$('.chosen .health').html(chosen.health);
	$('.attack-info').html("You attacked " + opponent.name + " for " + chosen.attackPower);
	$('.counter-attack-info').html(" counter attacked by " + opponent.name + " for " + opponent.counterAtk);

	if(chosen.health < 1 || opponent.health < 1) {
		if(chosen.health < 1) {
			$('.info').html("You have lost the fight!");
			$('.btn-attack').remove();
			$('.fight-info').append('<button class="restart btn btn-danger">Restart</button>');
			$('.restart').click(restart);
		} else if (opponent.health < 1){
			$('.info').html("You have beaten " + opponent.name + "!");
			$('.toFight div').remove();
			$('.btn-attack').remove();
			$('.toChoose').on('click', pickEnemy);
		}
		if($('.enemy div').length== 0 && opponent.health < 1) {
			$('.info').html("You have won the fight!");
			$('.btn-attack').remove();
			$('.fight-info').append('<button class="restart btn btn-danger">Restart</button>');
			$('.restart').click(restart);


		}
	}
}
if(opponent == 'undefined'){
	$('.btn-attack').remove();
}
function restart() {
	location.reload();

}

$(document).ready(function(){
		$('.toChoose').on('click', choosePlayer);
		$('.toChoose').click(function(){
        $('.toChoose').unbind('click', choosePlayer);
     });

});
