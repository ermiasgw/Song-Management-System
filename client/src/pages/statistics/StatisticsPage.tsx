import { useDispatch, useSelector } from "react-redux";
import { statisticsActions } from "../../store/statistics";
import { useEffect } from "react";
import { RootState } from "../../store";
import { Box, Heading } from "rebass";
import { useTheme } from "@emotion/react";



const StatisticsPage = () => {
    const theme = useTheme()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(statisticsActions.getStatisticsRequest())
    }, [])

    const statistics = useSelector((state: RootState) => state.statisticsReducer.items)
    console.log(statistics)

    return (
      <Box p={20} width={"100%"}>
        <Heading>statistics</Heading>
        { statistics && (
            <>
            <ul>
                <li>Number of Users = {statistics.no_users}</li>
                <li>Number of Albums = {statistics.no_albums}</li>
                <li>Number of Genres = {statistics.no_generes}</li>
                <li>Number of Songs = {statistics.no_songs}</li>
                        
                
            </ul>
            { statistics.no_song_in_each_artist && (
                <>
                <h5>Number of Songs in Each Artist:</h5>
                <ul>
                    
                    {statistics.no_song_in_each_artist.map((artist) => (
                        <li>Number of Songs {artist.artist} Have = {artist.count}</li>
                    ))}
                   
                </ul>
                </>
                )
                    }
            { statistics.no_song_in_each_generes && (
                <>
                <h5>Number of Songs in Each Genre:</h5>
                <ul>
                    
                    {statistics.no_song_in_each_generes.map((genere) => (
                        <li>Number of Songs {genere.genere} Have = {genere.count}</li>
                    ))}
                   
                </ul>
                </>
                )
                    }
            
            { statistics.no_album_in_each_artist && (
                <>
                <h5>Number of Albums in Each Artist:</h5>
                <ul>
                    
                    {statistics.no_album_in_each_artist.map((artist) => (
                        <li>Number of Albums {artist.artist} Have = {artist.count}</li>
                    ))}
                   
                </ul>
                </>
                )
                    }

            { statistics.no_song_in_each_album && (
                <>
                <h5>Number of Songs in Each Album:</h5>
                <ul>
                    
                    {statistics.no_song_in_each_album.map((album) => (
                        <li>Number of Songs {album.album} Have = {album.count}</li>
                    ))}
                   
                </ul>
                </>
                )
            }
            

            </>
            
            )
            
        }
        
      </Box>

    )
  };
  
  export default StatisticsPage