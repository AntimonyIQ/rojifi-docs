import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3Network = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;
        const svg = d3.select(svgRef.current);

        svg.selectAll('*').remove();

        // Create random nodes
        const numNodes = 40;
        const nodes = Array.from({ length: numNodes }, (_, i) => ({
            id: i,
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: Math.random() * 2 + 2,
        }));

        // Initial render
        const nodeElements = svg.selectAll('circle')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('r', d => d.radius)
            .attr('fill', 'currentColor')
            .attr('class', 'text-slate-300 dark:text-slate-700 opacity-50');

        // Animation loop
        const animate = () => {
            // Update positions
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off walls
                if (node.x <= 0 || node.x >= width) node.vx *= -1;
                if (node.y <= 0 || node.y >= height) node.vy *= -1;
            });

            // Draw links between nearby nodes
            const links: { x1: number, y1: number, x2: number, y2: number, opacity: number }[] = [];
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 150;

                    if (distance < maxDistance) {
                        links.push({
                            x1: nodes[i].x,
                            y1: nodes[i].y,
                            x2: nodes[j].x,
                            y2: nodes[j].y,
                            opacity: 1 - distance / maxDistance
                        });
                    }
                }
            }

            // Update links
            const linkSelection = svg.selectAll('line').data(links);

            linkSelection.enter()
                .insert('line', 'circle')
                .attr('stroke', 'currentColor')
                .attr('class', 'text-slate-200 dark:text-slate-800')
                .merge(linkSelection as any)
                .attr('x1', d => d.x1)
                .attr('y1', d => d.y1)
                .attr('x2', d => d.x2)
                .attr('y2', d => d.y2)
                .attr('stroke-width', 1)
                .attr('opacity', d => d.opacity * 0.4);

            linkSelection.exit().remove();

            // Update nodes
            nodeElements
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <svg
            ref={svgRef}
            className="w-full h-full absolute inset-0 -z-10 pointer-events-none"
        />
    );
};

export default D3Network;
