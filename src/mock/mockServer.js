// 引入mockjs文件
import Mock from 'mockjs'
// json和图片默认暴露
import banner from './banner.json'
import floor from './floor.json'
Mock.mock('/mock/banner', { code: 200, data: banner });
Mock.mock('/mock/floor', { code: 200, data: floor });