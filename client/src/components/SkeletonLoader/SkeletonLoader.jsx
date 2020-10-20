import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonLoader = () => {
	return (
		<>
			<div style={{ margin: '20px 50px' }}>
				<div style={{ display: 'flex' }}>
					<ContentLoader
						speed={2}
						width={400}
						height={400}
						style={{ marginRight: '50px' }}
						viewBox='0 0 500 500'
						backgroundColor='#f3f3f3'
						foregroundColor='#ecebeb'
					>
						<rect x='0' y='17' rx='0' ry='0' width='200' height='250' />
						<rect x='225' y='17' rx='0' ry='0' width='201' height='59' />
						<rect x='225' y='97' rx='0' ry='0' width='192' height='42' />
						<rect x='226' y='156' rx='0' ry='0' width='122' height='25' />
						<rect x='225' y='196' rx='0' ry='0' width='124' height='24' />
						<rect x='0' y='280' rx='0' ry='0' width='200' height='37' />
					</ContentLoader>
					<ContentLoader
						speed={2}
						width={400}
						height={400}
						viewBox='0 0 500 500'
						backgroundColor='#f3f3f3'
						foregroundColor='#ecebeb'
					>
						<rect x='0' y='17' rx='0' ry='0' width='200' height='250' />
						<rect x='225' y='17' rx='0' ry='0' width='201' height='59' />
						<rect x='225' y='97' rx='0' ry='0' width='192' height='42' />
						<rect x='226' y='156' rx='0' ry='0' width='122' height='25' />
						<rect x='225' y='196' rx='0' ry='0' width='124' height='24' />
						<rect x='0' y='280' rx='0' ry='0' width='200' height='37' />
					</ContentLoader>
				</div>
				<div style={{ display: 'flex' }}>
					<ContentLoader
						speed={2}
						width={400}
						style={{ marginRight: '50px' }}
						height={400}
						viewBox='0 0 500 500'
						backgroundColor='#f3f3f3'
						foregroundColor='#ecebeb'
					>
						<rect x='0' y='17' rx='0' ry='0' width='200' height='250' />
						<rect x='225' y='17' rx='0' ry='0' width='201' height='59' />
						<rect x='225' y='97' rx='0' ry='0' width='192' height='42' />
						<rect x='226' y='156' rx='0' ry='0' width='122' height='25' />
						<rect x='225' y='196' rx='0' ry='0' width='124' height='24' />
						<rect x='0' y='280' rx='0' ry='0' width='200' height='37' />
					</ContentLoader>
					<ContentLoader
						speed={2}
						width={400}
						height={400}
						viewBox='0 0 500 500'
						backgroundColor='#f3f3f3'
						foregroundColor='#ecebeb'
					>
						<rect x='0' y='17' rx='0' ry='0' width='200' height='250' />
						<rect x='225' y='17' rx='0' ry='0' width='201' height='59' />
						<rect x='225' y='97' rx='0' ry='0' width='192' height='42' />
						<rect x='226' y='156' rx='0' ry='0' width='122' height='25' />
						<rect x='225' y='196' rx='0' ry='0' width='124' height='24' />
						<rect x='0' y='280' rx='0' ry='0' width='200' height='37' />
					</ContentLoader>
				</div>
			</div>
		</>
	);
};

export default SkeletonLoader;
