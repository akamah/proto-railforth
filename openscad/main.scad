use <rail.scad>


// slope(false, false, 16);

name = "";
flipped = false;
inverted = false;

if (name == "turnout") {
  turnout(flipped, inverted, 4);
}

if (name == "straight") {
  straight(4, inverted);
}
