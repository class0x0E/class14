import React, { useEffect, useState, useRef } from 'react';

const FloatingTOC = () => {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [position, setPosition] = useState({ x: 0, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false); // 控制目录显示
  const [isExpanded, setIsExpanded] = useState(true); // 控制目录展开/收起
  const tocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //设置初始位置
    setPosition({ x: window.innerWidth - 280, y: 100 });
    setIsVisible(true);

    const content = document.querySelector('.content');
    if (!content) return;

    const elements = Array.from(content.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const validHeadings = elements.filter(el => {
        // 过滤掉在.tab-content内的标题
        // 检查元素的所有祖先，看是否有包含 'tab-content' 类的
        let parent = el.parentElement;
        while (parent) {
            if (parent.classList.contains('tab-content')) {
                return false;
            }
            parent = parent.parentElement;
        }
        return true;
    }).map((el, index) => {
        if (!el.id) {
            el.id = `heading-${index}`;
        }
        return {
            id: el.id,
            text: el.textContent || '',
            level: parseInt(el.tagName.substring(1))
        };
    });

    setHeadings(validHeadings);
  }, []);
  //拖拽相关事件处理
  const handleMouseDown = (e: React.MouseEvent) => {
    if (tocRef.current) {
        setIsDragging(true);
        const rect = tocRef.current.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    }
  };
  // 鼠标移动时更新位置
  const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
          setPosition({
              x: e.clientX - dragOffset.x,
              y: e.clientY - dragOffset.y
          });
      }
  };
    // 鼠标释放时停止拖拽
  const handleMouseUp = () => {
      setIsDragging(false);
  };
  // 添加和移除全局鼠标事件监听
  useEffect(() => {
      if (isDragging) {
          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mouseup', handleMouseUp);
      } else {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
      }
      return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
      };
  }, [isDragging]);

  if (!isVisible || headings.length === 0) return null;

  return (
    <div
        ref={tocRef}
        style={{
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex: 1000,
            backgroundColor: 'var(--color-body)', // 适应暗黑模式
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            width: '250px',
            maxHeight: isExpanded ? '60vh' : 'auto', // 收起时自动高度
            overflowY: isExpanded ? 'auto' : 'hidden', // 收起时隐藏滚动条
            cursor: isDragging ? 'grabbing' : 'default',
            color: 'var(--color-text)',
            transition: 'max-height 0.3s ease' // 添加平滑过渡效果
        }}
    >
        <div
            style={{
                paddingBottom: isExpanded ? '8px' : '0', // 收起时减少底部内边距
                borderBottom: isExpanded ? '1px solid var(--color-border)' : 'none', // 收起时移除底部边框
                marginBottom: isExpanded ? '8px' : '0', // 收起时移除底部外边距
                fontWeight: 'bold',
                userSelect: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            {/* 拖拽区域 */}
            <div 
                onMouseDown={handleMouseDown}
                style={{ 
                    cursor: 'grab', 
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <span>目录</span>
            </div>
            
            {/* 展开/收起开关 */}
            <div 
                onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                }}
                style={{
                    cursor: 'pointer',
                    padding: '4px',
                    fontSize: '12px',
                    color: '#888',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                title={isExpanded ? "收起" : "展开"}
            >
                {isExpanded ? '▼' : '▲'}
            </div>
        </div>
        
        {/* 目录列表，仅在展开时显示 */}
        {isExpanded && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {headings.map(heading => (
                    <li key={heading.id} style={{ 
                        marginLeft: `${(heading.level - 1) * 10}px`, 
                        marginBottom: '6px',
                        lineHeight: '1.2'
                    }}>
                        <a
                            href={`#${heading.id}`}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                fontSize: '14px',
                                display: 'block',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                opacity: 0.8
                            }}
                            onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                            onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        )}
    </div>
  );
};

export default FloatingTOC;
