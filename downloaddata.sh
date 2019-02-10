if [ ! -f training.1600000.processed.noemoticon.csv ]; then
    wget --progress=dot https://cs.stanford.edu/people/alecmgo/trainingandtestdata.zip
    unzip trainingandtestdata.zip
    sed -i '1s;^;polarity,id,date,query,user,text\n;' training.1600000.processed.noemoticon.csv
fi