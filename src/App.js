import './App.css';
import { Upload, message, Button, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import React from 'react';
// const htp = '127.0.0.1:7001';
// const htp = '121.196.178.118:7001';
const htp = 'file.haozengrun.com';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            fileBackurl: ''
        }
    }
    propsdata = {
        name: 'file',
        action: 'http://'+ htp +'/uploadfile',
        onChange: (info) => {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                this.setState({
                    fileBackurl: 'http://'+ htp + '/' + info.fileList[0].response.data.url
                })
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    };
    delFolder = (name)=>{
        fetch('http://'+ htp +'/test', {
            method: 'POST',
            mode: 'cors'
        }).then(res => {
            console.log(res, '=====');
        });
    }
    copyAccessKey = () => {
    	//因为我的input框里面还有button 按钮，所以在选择节点的时候，一定要只选择input  
        var copyDOM = document.querySelector(".inputBox input");  //需要复制文字的节点
        var range = document.createRange(); //创建一个range
        window.getSelection().removeAllRanges();   //清楚页面中已有的selection
        range.selectNode(copyDOM);    // 选中需要复制的节点    
        window.getSelection().addRange(range);   // 执行选中元素
        var successful = document.execCommand('copy');    // 执行 copy 操作  
        if(successful){
            message.success('复制成功！')
        }else{
            message.warning('复制失败，请手动复制！')
        }
        // 移除选中的元素  
        window.getSelection().removeAllRanges(); 
    }

    render() {
        return (
            <div className="App">
                <div>
                    <div className="proxy" onClick={this.delFolder}></div>
                    <Upload {...this.propsdata}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                    <div className='inputBox' >
                        <Input
                        className={`copyInput apiInput`}
                        value={this.state.fileBackurl}
                        /> 

<button onClick={this.copyAccessKey} className={`verificationCode`}>
                                点击复制</button> 
                    </div>
                </div>
            </div>
        );
    }
}
export default App;

