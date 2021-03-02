import React, { useState, useEffect } from 'react';
import { Table, Tag, Spin } from 'antd';

import { getListAnime } from '../../api/anime';

const TableAnime = () => {

	const[animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAnimeList();
    }, []);

	async function getAnimeList() {
		setLoading(true);
		const animeList = await getListAnime();
		const animeListForTable = animeList.data.map((item) => {
			return {
				key: item.id,
				title: (
					<b> <a href = { `/anime/${ item.slug }` }> { item.title } </a> </b>
				),
				tagsAiring_Start: [item.airing_start],
				tagsEpisodes: [ item.episodes ],
				tagsScore: [ item.score ]
			}
		});
		setAnimeList(animeListForTable);
		setLoading(false);
	}

	const columns = [
		{
			title: <b> { 'Title' } </b>,
			dataIndex: 'title',
			key: 'title',
			width: '20%',
		},
		{
			title: <b> { 'Airing Start' } </b>,
			dataIndex: 'tagsAiring_Start',
			key: 'tagsAiring_Start',
			width: '10%',
			render: tagsAiring_Start => (
				<>
					{ tagsAiring_Start.map(airing_start => {
						
						let color = '';

						if(airing_start === 'Undefined') {
							color = 'red';
						} else {
							color = 'green';
						}

						return (
							<Tag color = { color } key = { airing_start } >
								<b> { airing_start } </b> 
							</Tag>
						);
					})}
				</>
			)
		},
		{
			title: <b> { 'Episodes' } </b>,
			dataIndex: 'tagsEpisodes',
			key: 'tagsEpisodes',
			width: '10%',
			render: tagsEpisodes => (
				<>
					{ tagsEpisodes.map(episode => {
						
						let color = '';

						if (episode === 0 ) {
							color = 'red';
						} else {
							color = 'blue';
						}

						return (
							<Tag color = { color } key = { episode } >
								<b> { episode } </b> 
							</Tag>
						);
					})}
				</>
			)
		},
		{
			title: <b> { 'Score' } </b>,
			dataIndex: 'tagsScore',
			key: 'tagsScore',
			width: '10%',
			render: tagsScore => (
				<>
					{ tagsScore.map(tag => {
						
						let color = '';

						if (tag >= 0 && tag <= 6.0) {
							color = 'red';
						} else if(tag > 6.0 && tag <= 8.0) {
							color = 'green';
						} else {
							color = 'blue';
						}

						return (
							<Tag color = { color } key = { tag } >
								<b> { tag } </b> 
							</Tag>
						);
					})}
				</>
			)
		},
	];

	return (
		loading ? (
            <Spin tip = 'Loading Table Anime, Wait For ...' className = 'loadingSpin'/>
        ) : (
			<Table 
				columns = { columns } dataSource = { animeList } 
				pagination = {{ showSizeChanger: false }} 
			/>
		)
	)
};

export default TableAnime;