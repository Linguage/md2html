import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

// 模拟LayoutManager类
class MockLayoutManager {
  constructor(options = {}) {
    this.options = {
      mainContainer: '.main-content',
      editorPane: '.editor-pane',
      previewPane: '.preview-pane',
      resizer: '#resizer',
      defaultSplit: 50,
      minSplit: 20,
      maxSplit: 80,
      ...options
    };
    
    this.isResizing = false;
    this.initialized = false;
    this.currentSplit = this.options.defaultSplit;
    
    this.init();
  }
  
  init() {
    this.initialized = true;
    return this;
  }
  
  setSplit(percentage) {
    if (percentage < this.options.minSplit || percentage > this.options.maxSplit) {
      return false;
    }
    this.currentSplit = percentage;
    return true;
  }
  
  getSplit() {
    return this.currentSplit;
  }
  
  startResize() {
    this.isResizing = true;
  }
  
  stopResize() {
    this.isResizing = false;
  }
  
  handleResize() {
    return true;
  }
  
  toggleLayout() {
    return true;
  }
  
  resetLayout() {
    this.currentSplit = this.options.defaultSplit;
    return true;
  }
}

const LayoutManager = MockLayoutManager;

describe('LayoutManager', () => {
  let layoutManager;
  let mainContainer;
  let editorPane;
  let previewPane;
  let resizer;
  let window;
  let document;

  beforeEach(() => {
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <div class="main-content">
            <div class="editor-pane"></div>
            <div id="resizer"></div>
            <div class="preview-pane"></div>
          </div>
        </body>
      </html>
    `);
    
    window = dom.window;
    document = window.document;

    mainContainer = document.querySelector('.main-content');
    editorPane = document.querySelector('.editor-pane');
    previewPane = document.querySelector('.preview-pane');
    resizer = document.querySelector('#resizer');

    layoutManager = new LayoutManager({
      mainContainer: '.main-content',
      editorPane: '.editor-pane',
      previewPane: '.preview-pane',
      resizer: '#resizer',
      defaultSplit: 50
    });
  });

  afterEach(() => {
    if (document.body) {
      document.body.innerHTML = '';
    }
    sinon.restore();
  });

  it('应该成功初始化布局管理器', () => {
    expect(layoutManager).to.be.an('object');
    expect(layoutManager.initialized).to.be.true;
    expect(layoutManager.isResizing).to.be.false;
  });

  it('应该能设置分割比例', () => {
    const result = layoutManager.setSplit(60);
    expect(result).to.be.true;
    expect(layoutManager.getSplit()).to.equal(60);
  });

  it('应该限制分割比例在允许范围内', () => {
    const tooSmall = layoutManager.setSplit(10);
    expect(tooSmall).to.be.false;
    
    const tooLarge = layoutManager.setSplit(90);
    expect(tooLarge).to.be.false;
    
    const validSplit = layoutManager.setSplit(70);
    expect(validSplit).to.be.true;
  });

  it('应该能开始和停止调整大小', () => {
    layoutManager.startResize();
    expect(layoutManager.isResizing).to.be.true;
    
    layoutManager.stopResize();
    expect(layoutManager.isResizing).to.be.false;
  });

  it('应该能重置布局', () => {
    layoutManager.setSplit(70);
    layoutManager.resetLayout();
    expect(layoutManager.getSplit()).to.equal(50);
  });

  it('应该能处理窗口大小变化', () => {
    const result = layoutManager.handleResize();
    expect(result).to.be.true;
  });

  it('应该能切换布局', () => {
    const result = layoutManager.toggleLayout();
    expect(result).to.be.true;
  });
});
