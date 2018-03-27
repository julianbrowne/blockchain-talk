
HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${HERE}/vendor/reveal

npm start -- --port=8001 --root=../..
