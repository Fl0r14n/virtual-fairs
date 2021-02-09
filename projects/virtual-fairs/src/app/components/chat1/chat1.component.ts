import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
// import Peer from 'peerjs';
import {OptionElement, OptionType} from '../../models';

const closeStream = (s: MediaStream) => {
  s.getTracks().forEach(t => t.stop());
}

const enableAudioStream = (s: MediaStream, v: boolean) => {
  s && s.getAudioTracks().forEach(t => t.enabled = v);
}

const enableVideoStream = (s: MediaStream, v: boolean) => {
  s && s.getVideoTracks().forEach(t => t.enabled = v);
}

@Component({
  selector: 'chat-component',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss']
})
export class Chat1Component implements OnInit {

  // peers: {
  //   peerId?: string;
  //   // peer?: SimplePeer.Instance;
  // } = [];

  private localStream: MediaStream;
  private displayStream: MediaStream;

  @ViewChild('localVideo')
  localVideo: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo')
  remoteVideo: ElementRef<HTMLVideoElement>;

  @ViewChildren('peerVideo')
  peerVideos: QueryList<ElementRef<HTMLVideoElement>>

  private _audio = false;
  private _video = true;
  private _display = false;
  private _call = false;

  get audio() {
    return this._audio;
  }

  set audio(audio) {
    this._audio = audio;
    enableAudioStream(this.localStream, this._audio);
  }

  get video() {
    return this._video;
  }

  set video(video) {
    this._video = video;
    enableVideoStream(this.localStream, this._video);
  }

  get display() {
    return this._display;
  }

  get call() {
    return this._call;
  }

  set call(call) {
    this._call = call;
    console.log(this.localStream);
    if (this.localStream) {
      closeStream(this.localStream);
      this.localStream = null;
    } else {
      navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(s => {
        enableVideoStream(s, this.video);
        enableAudioStream(s, this.audio);
        this.localStream = s;
        this.localVideo.nativeElement.srcObject = this.localStream;
      });
    }
  }

  set display(display) {
    this._display = display;
    if (this.displayStream) {
      closeStream(this.displayStream);
      this.displayStream = null;
    } else {
      // @ts-ignore
      navigator.mediaDevices.getDisplayMedia({cursor: true}).then(s => {
        this.displayStream = s;
        this.remoteVideo.nativeElement.srcObject = this.displayStream;
        //   const screenTrack = s.getTracks()[0];
        //   senders.current.find(s => s.track.kind === 'video').replaceTrack(screenTrack);
        //   screenTrack.onended = () => {
        //     senders.current.find(s => s.track.kind === 'video').replaceTrack(existingVideoTrack)
        //   }
      })
    }
  }

  options = {
    [OptionType.AUDIO]: {value: this.audio, disabled: false, valueChanged: v => this.audio = v},
    [OptionType.VIDEO]: {value: this.video, disabled: false, valueChanged: v => this.video = v},
    [OptionType.DISPLAY]: {value: false, disabled: false, valueChanged: v => this.display = v},
    [OptionType.RECORD]: {value: false, disabled: true},
    [OptionType.CALL]: {value: this.call, disabled: false, valueChanged: v => this.call = v},
    [OptionType.CHAT]: {value: false, disabled: false},
    [OptionType.SETTINGS]: {value: false, disabled: false}
  } as Record<OptionType, OptionElement<boolean>>;

  constructor() {
  }

  ngOnInit(): void {
    // const peer = new Peer();
    // peer.on('open', id => {
    //   console.log(id);
    //   this.socket.send({
    //     type: 'join-room',
    //     data: {
    //       roomId: 'room',
    //       id: id
    //     }
    //   })
    // })
  }
}
