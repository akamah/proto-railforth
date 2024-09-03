#!/bin/bash
set -euo pipefail

ROOT_DIR=$(git rev-parse --show-toplevel)

ASSETS_DIR=$ROOT_DIR/assets
OPENSCAD_DIR=$ROOT_DIR/openscad

parameters_file=$(mktemp)

jsonnet -o "$parameters_file" "$OPENSCAD_DIR/parameters.jsonnet"

mkdir -p "${ASSETS_DIR}"
for param_name in $(jq -r '.parameterSets|keys[]' "$parameters_file")
do
  echo "$param_name"
  openscad --hardwarnings --check-parameters=true \
    -o "$ASSETS_DIR/$param_name.off" \
    -p "$parameters_file" -P "$param_name" \
    "$OPENSCAD_DIR/main.scad"
done

rm "$parameters_file"
