import React, { useEffect, useState, useRef } from 'react';

const FloatingTOC = () => {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [position, setPosition] = useState({ x: 0, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false); // 控制目录显示
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
        return !el.closest('.tab-content');
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
            maxHeight: '60vh',
            overflowY: 'auto',
            cursor: isDragging ? 'grabbing' : 'default',
            color: 'var(--color-text)'
        }}
    >
        <div
            onMouseDown={handleMouseDown}
            style={{
                cursor: 'grab',
                paddingBottom: '8px',
                borderBottom: '1px solid var(--color-border)',
                marginBottom: '8px',
                fontWeight: 'bold',
                userSelect: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <span>目录</span>
            <span style={{fontSize: '12px', color: '#888'}}>::</span>
        </div>
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
    </div>
  );
};

export default FloatingTOC;
