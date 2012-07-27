		var speed = 10;
private var playerSpeed : float = 10.0;
private var playerSpeedDiag : float = playerSpeed*Mathf.Cos(45);

function Start () {

}

function Update () {
	
	faceMouse();
	move();

}

function move(){

	//playerSpeedDiag = playerSpeed*Mathf.Cos(45);

	if (Input.GetKey("w")&&Input.GetKey("d"))
		transform.position = transform.position +
		Vector3(playerSpeedDiag*Time.deltaTime, 0, playerSpeedDiag*Time.deltaTime);
	else if (Input.GetKey("w")&&Input.GetKey("a"))
		transform.position = transform.position +
		Vector3(-playerSpeedDiag*Time.deltaTime, 0, playerSpeedDiag*Time.deltaTime);
	else if (Input.GetKey("s")&&Input.GetKey("a"))
		transform.position = transform.position +
		Vector3(-playerSpeedDiag*Time.deltaTime, 0, -playerSpeedDiag*Time.deltaTime);
	else if (Input.GetKey("s")&&Input.GetKey("d"))
		transform.position = transform.position +
		Vector3(playerSpeedDiag*Time.deltaTime, 0, -playerSpeedDiag*Time.deltaTime);
	else {
		if (Input.GetKey("w"))
			transform.position = transform.position + Vector3(0, 0, playerSpeed*Time.deltaTime);
		else if (Input.GetKey("s"))
			transform.position = transform.position + Vector3(0, 0, -playerSpeed*Time.deltaTime);
		
		if (Input.GetKey("d"))
			transform.position = transform.position + Vector3(playerSpeed*Time.deltaTime, 0, 0);
		else if (Input.GetKey("a"))
			transform.position = transform.position + Vector3(-playerSpeed*Time.deltaTime, 0, 0);
	}

}

function faceMouse(){

	// Generate a plane that intersects the transform's position with an upwards normal.
    var playerPlane = new Plane(Vector3.up, transform.position);

    // Generate a ray from the cursor position
    var ray = Camera.main.ScreenPointToRay (Input.mousePosition);

    // Determine the point where the cursor ray intersects the plane.
    // This will be the point that the object must look towards to be looking at the mouse.
    // Raycasting to a Plane object only gives us a distance, so we'll have to take the distance,
    //   then find the point along that ray that meets that distance.  This will be the point
    //   to look at.
    var hitdist = 0.0;
    // If the ray is parallel to the plane, Raycast will return false.
    if (playerPlane.Raycast (ray, hitdist)) {
        // Get the point along the ray that hits the calculated distance.
        var targetPoint = ray.GetPoint(hitdist);

        // Determine the target rotation.  This is the rotation if the transform looks at the target point.
        var targetRotation = Quaternion.LookRotation(targetPoint - transform.position);

        // Smoothly rotate towards the target point.
      //transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, speed * Time.deltaTime); // WITH SPEED
        transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, 1); // WITHOUT SPEED!!!
    }
}