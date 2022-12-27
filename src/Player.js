import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: #333;
  color: #fff;
  font-family: sans-serif;
`;

const AudioElement = styled.audio`
  display: none;
`;

const CoverArt = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const Title = styled.h1`
  font-size: 16px;
  margin: 0;
`;

const Artist = styled.h2`
  font-size: 14px;
  margin: 0;
  color: #999;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 0 20px;
`;

const PlayButton = styled.button`
  appearance: none;
  border: none;
  background-color: transparent;
  font-size: 28px;
  color: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Time = styled.div`
  margin: 0 10px;
  font-size: 14px;
  color: #999;
`;

const VolumeControl = styled.input`
  appearance: none;
  width: 50px;
  height: 4px;
  background-color: #999;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background-color: #fff;
    border-radius: 6px;
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

function Player() {
    const audioElement = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTrack, setCurrentTrack] = useState({
        title: 'Kytara',
        artist: 'VADAMKO',
        coverArtUrl: 'IMG_0413.jpg',
        audioUrl: 'kytara_nocni_beat.mp3'
    });
    /*
    const [tracks, setTracks] = useState([
        {
            title: 'Track 1',
            artist: 'Artist 1',
            coverArtUrl: 'path/to/cover_art_1.jpg',
            audioUrl: 'path/to/audio_1.mp3'
        },
        {
            title: 'Track 2',
            artist: 'Artist 2',
            coverArtUrl: 'path/to/cover_art_2.jpg',
            audioUrl: 'path/to/audio_2.mp3'
        },
        // ... další skladby
    ]);
    */
    // automaticke vytvareni seznamu skladeb z mistni slozky

    //const fs = require('fs');

   // const directoryPath = 'C:\\Users\\vadam\\Documents\\GitHub\\radio_online\\src';

    /*path.readdir(directoryPath, function(err, files) {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        // vytvoření pole skladeb
        const tracks = [];
        for (const file of files) {
            // zpracování souboru a přidání informací o skladbě do pole
            tracks.push({
                title: file,
                artist: 'Unknown',
                coverArtUrl: '/path/to/default_cover_art.jpg',
                audioUrl: `${directoryPath}/${file}`
            });
        }

        console.log(tracks);

    }); */

    //

    const togglePlay = () => {
        if (isPlaying) {
            audioElement.current.pause();
        } else {
            audioElement.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioElement.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioElement.current.duration);
    };

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
        audioElement.current.volume = event.target.value;
    };

    const handleEnded = () => {
        setIsPlaying(false);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const ControlsContainer = styled.div`
        display: flex;
        align-items: center;
        margin-left: auto;
        padding: 0 20px;
      `;

    const PreviousButton = styled.button`
  appearance: none;
  border: none;
  background-color: transparent;
  font-size: 28px;
  color: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

    const NextButton = styled.button`
  appearance: none;
  border: none;
  background-color: transparent;
  font-size: 28px;
  color: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

    const handlePreviousClick = () => {
        // zde byste měli zajistit, aby se přehrávala předchozí skladba v seznamu skladeb
        // můžete například použít setCurrentTrack() a setCurrentTime() k aktualizaci stavu
    };

    const handleNextClick = () => {
        // zde byste měli zajistit, aby se přehrávala další skladba v seznamu skladeb
        // můžete například použít setCurrentTrack() a setCurrentTime() k aktualizaci stavu
    };

    return (
        <Container>
            <AudioElement
                ref={audioElement}
                src={currentTrack.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                volume={volume}
            />
            <CoverArt src={currentTrack.coverArtUrl} />
            <InfoContainer>
                <Title>{currentTrack.title}</Title>
                <Artist>{currentTrack.artist}</Artist>
            </InfoContainer>
            <ControlsContainer>
                <PreviousButton onClick={handlePreviousClick}>{'<<'}</PreviousButton>
                <PlayButton onClick={togglePlay}>
                    {isPlaying ? '❚❚' : '▶'}
                </PlayButton>
                <NextButton onClick={handleNextClick}>{'>>'}</NextButton>
                <Time>{formatTime(currentTime)} / {formatTime(duration)}</Time>
                <VolumeControl
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </ControlsContainer>
        </Container>
    );
}

export default Player;