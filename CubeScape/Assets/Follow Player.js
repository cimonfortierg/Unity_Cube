#pragma strict

var player : GameObject;

function Start () {

}

function Update () {

	transform.position.x= player.transform.position.x;
	transform.position.z= player.transform.position.z;
}